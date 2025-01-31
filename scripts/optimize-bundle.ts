import fs from 'fs'
import path from 'path'
import zlib from 'zlib'

// Bundle optimization script
async function optimizeBundle() {
  const distPath = path.resolve(__dirname, '../dist')
  
  // List of files to optimize
  const bundleFiles = [
    'foundation-ui.es.js',
    'foundation-ui.umd.js',
    'style.css'
  ]

  console.log('🚀 Starting bundle optimization...')

  for (const file of bundleFiles) {
    const filePath = path.join(distPath, file)
    
    try {
      // Read file
      const content = await fs.promises.readFile(filePath)
      
      // Gzip compression
      const gzippedContent = await new Promise<Buffer>((resolve, reject) => {
        zlib.gzip(content, (err, result) => {
          if (err) reject(err)
          else resolve(result)
        })
      })

      // Write gzipped file
      const gzipPath = `${filePath}.gz`
      await fs.promises.writeFile(gzipPath, gzippedContent)

      // Calculate size reduction
      const originalSize = content.length
      const gzippedSize = gzippedContent.length
      const reduction = ((originalSize - gzippedSize) / originalSize * 100).toFixed(2)

      console.log(`✨ Optimized ${file}:`)
      console.log(`   Original Size: ${originalSize} bytes`)
      console.log(`   Gzipped Size: ${gzippedSize} bytes`)
      console.log(`   Size Reduction: ${reduction}%`)
    } catch (error) {
      console.error(`❌ Error optimizing ${file}:`, error)
    }
  }

  console.log('🎉 Bundle optimization complete!')
}

optimizeBundle().catch(console.error)
