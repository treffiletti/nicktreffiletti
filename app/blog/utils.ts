import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  publishedAt: string
  description: string
  tags: string[]
  draft: boolean
  image?: string
}

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match![1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<Metadata> = {}

  let currentKey = ''
  let currentArray: string[] = []
  let inArray = false

  frontMatterLines.forEach((line) => {
    if (line.trim().startsWith('- ')) {
      // Array item
      if (inArray) {
        currentArray.push(line.trim().substring(2))
      }
    } else if (line.includes(': ')) {
      // Finish previous array if we were in one
      if (inArray && currentKey) {
        metadata[currentKey as keyof Metadata] = currentArray as any
        currentArray = []
        inArray = false
      }

      let [key, ...valueArr] = line.split(': ')
      let value = valueArr.join(': ').trim()
      value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
      currentKey = key.trim()
      
      if (value === '') {
        // Next lines might be an array
        inArray = true
        currentArray = []
      } else {
        metadata[currentKey as keyof Metadata] = value as any
      }
    }
  })

  // Handle final array if we ended with one
  if (inArray && currentKey) {
    metadata[currentKey as keyof Metadata] = currentArray as any
  }

  // Apply defaults
  const defaults = {
    title: '',
    description: '',
    publishedAt: '',
    tags: [] as string[],
    draft: false,
    image: '',
  }

  const finalMetadata = { ...defaults, ...metadata }

  return { metadata: finalMetadata as Metadata, content }
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'app', 'blog', 'posts'))
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}
