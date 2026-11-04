import AppKit
import AVFoundation
import CoreImage
import CoreVideo

let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let frameDirectory = root.appendingPathComponent("docs/demo-frames")
let outputURL = root.appendingPathComponent("docs/vaux-demo.mp4")
let frameNames = [
  "01-hero-en.png", "02-hero-zh.png", "03-create.png",
  "04-express-camera.png", "05-control.png", "06-product.png",
  "07-developers.png", "08-waitlist.png",
]

let width = 1280
let height = 720
let fps: Int32 = 30
let secondsPerSlide = 3.0
let transitionSeconds = 0.5
let slideFrames = Int(secondsPerSlide * Double(fps))
let transitionFrames = Int(transitionSeconds * Double(fps))

func loadImage(_ name: String) throws -> CIImage {
  let url = frameDirectory.appendingPathComponent(name)
  guard let image = NSImage(contentsOf: url),
        let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil)
  else { throw NSError(domain: "VAUXDemo", code: 1, userInfo: [NSLocalizedDescriptionKey: "Cannot load \(name)"]) }
  return CIImage(cgImage: cgImage).cropped(to: CGRect(x: 0, y: 0, width: width, height: height))
}

func opacity(_ image: CIImage, _ value: CGFloat) -> CIImage {
  image.applyingFilter("CIColorMatrix", parameters: [
    "inputAVector": CIVector(x: 0, y: 0, z: 0, w: value),
  ])
}

try? FileManager.default.removeItem(at: outputURL)
let images = try frameNames.map(loadImage)
let writer = try AVAssetWriter(outputURL: outputURL, fileType: .mp4)
let input = AVAssetWriterInput(mediaType: .video, outputSettings: [
  AVVideoCodecKey: AVVideoCodecType.h264,
  AVVideoWidthKey: width,
  AVVideoHeightKey: height,
  AVVideoCompressionPropertiesKey: [
    AVVideoAverageBitRateKey: 5_500_000,
    AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
  ],
])
input.expectsMediaDataInRealTime = false
let adaptor = AVAssetWriterInputPixelBufferAdaptor(
  assetWriterInput: input,
  sourcePixelBufferAttributes: [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
    kCVPixelBufferWidthKey as String: width,
    kCVPixelBufferHeightKey as String: height,
    kCVPixelBufferIOSurfacePropertiesKey as String: [:],
  ]
)
guard writer.canAdd(input) else { throw NSError(domain: "VAUXDemo", code: 2) }
writer.add(input)
guard writer.startWriting() else { throw writer.error ?? NSError(domain: "VAUXDemo", code: 3) }
writer.startSession(atSourceTime: .zero)

let context = CIContext(options: [.useSoftwareRenderer: false])
let colorSpace = CGColorSpaceCreateDeviceRGB()
let bounds = CGRect(x: 0, y: 0, width: width, height: height)
let black = CIImage(color: .black).cropped(to: bounds)
var globalFrame: Int64 = 0

for index in images.indices {
  for localFrame in 0..<slideFrames {
    while !input.isReadyForMoreMediaData { Thread.sleep(forTimeInterval: 0.002) }
    guard let pool = adaptor.pixelBufferPool else { throw NSError(domain: "VAUXDemo", code: 4) }
    var optionalBuffer: CVPixelBuffer?
    CVPixelBufferPoolCreatePixelBuffer(nil, pool, &optionalBuffer)
    guard let buffer = optionalBuffer else { throw NSError(domain: "VAUXDemo", code: 5) }

    var composed = images[index]
    if localFrame >= slideFrames - transitionFrames && index < images.count - 1 {
      let t = CGFloat(localFrame - (slideFrames - transitionFrames)) / CGFloat(transitionFrames)
      composed = opacity(images[index], 1 - t).composited(over: opacity(images[index + 1], t).composited(over: black))
    }
    if index == 0 && localFrame < transitionFrames {
      composed = opacity(composed, CGFloat(localFrame) / CGFloat(transitionFrames)).composited(over: black)
    }
    if index == images.count - 1 && localFrame >= slideFrames - transitionFrames {
      let t = CGFloat(localFrame - (slideFrames - transitionFrames)) / CGFloat(transitionFrames)
      composed = opacity(composed, 1 - t).composited(over: black)
    }

    context.render(composed, to: buffer, bounds: bounds, colorSpace: colorSpace)
    let time = CMTime(value: globalFrame, timescale: fps)
    guard adaptor.append(buffer, withPresentationTime: time) else { throw writer.error ?? NSError(domain: "VAUXDemo", code: 6) }
    globalFrame += 1
  }
}

input.markAsFinished()
await writer.finishWriting()
guard writer.status == .completed else { throw writer.error ?? NSError(domain: "VAUXDemo", code: 7) }
print(outputURL.path)
