# Payload CMS 3.0 Setup Guide

## 🚀 Installation Steps

### 1. Install Payload Dependencies

```bash
cd ~/Downloads/skyanalytix-web

npm install payload @payloadcms/db-mongodb @payloadcms/richtext-lexical @payloadcms/next --save
```

### 2. Setup MongoDB Atlas (Free)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a **FREE M0 cluster** (512MB)
3. Create **Database User**:
   - Username: `skyanalytix_admin`
   - Password: [Generate strong password]
4. **Network Access**: 
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
5. **Get Connection String**:
   - Click "Connect" → "Connect your application"
   - Copy: `mongodb+srv://skyanalytix_admin:<password>@cluster0.xxxxx.mongodb.net/skyanalytix?retryWrites=true&w=majority`

### 3. Environment Variables

Create `.env.local` file:

```bash
cat > .env.local << 'EOF'
# Payload CMS
PAYLOAD_SECRET=your-super-secret-key-change-this-in-production
MONGODB_URI=mongodb+srv://skyanalytix_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/skyanalytix?retryWrites=true&w=majority

# Next.js
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
EOF
```

**Generate PAYLOAD_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Update next.config.js

```javascript
const { withPayload } = require('@payloadcms/next/withPayload')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing config
  experimental: {
    reactCompiler: false,
  },
}

module.exports = withPayload(nextConfig)
```

### 5. Create Admin Panel Routes

```bash
# Create admin route structure
mkdir -p src/app/\(payload\)/admin/\[\[...segments\]\]
```

**Create admin page:** `src/app/(payload)/admin/[[...segments]]/page.tsx`

```typescript
import { RootPage } from '@payloadcms/next/views'
import { importMap } from '@/payload.config'
import config from '@payload-config'

type Args = {
  params: {
    segments: string[]
  }
  searchParams: { [key: string]: string | string[] }
}

const Page = ({ params, searchParams }: Args) => 
  RootPage({ config, params, searchParams, importMap })

export default Page
```

**Create admin layout:** `src/app/(payload)/layout.tsx`

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - SkyAnalytix',
  robots: 'noindex,nofollow',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

### 6. Create API Routes

```bash
mkdir -p src/app/\(payload\)/api/\[...slug\]
```

**Create API handler:** `src/app/(payload)/api/[...slug]/route.ts`

```typescript
import { REST_API } from '@payloadcms/next/rest'
import config from '@payload-config'

const handlers = REST_API({ config })

export const GET = handlers.GET
export const POST = handlers.POST
export const DELETE = handlers.DELETE
export const PATCH = handlers.PATCH
export const PUT = handlers.PUT
```

### 7. Create Payload Helper

**Create:** `src/lib/payload.ts`

```typescript
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

export async function getPayload() {
  return await getPayloadHMR({ config: configPromise })
}

// Example: Get all products
export async function getProducts() {
  const payload = await getPayload()
  const products = await payload.find({
    collection: 'products',
    where: {
      published: {
        equals: true,
      },
    },
  })
  return products.docs
}

// Example: Get product by slug
export async function getProductBySlug(slug: string) {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  return result.docs[0] || null
}
```

### 8. Update tsconfig.json

Add path alias:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@payload-config": ["./payload.config.ts"]
    }
  }
}
```

### 9. Build & Run

```bash
# Build the project
npm run build

# Run development server
npm run dev
```

### 10. Access Admin Panel

Open: http://localhost:3000/admin

**First time setup:**
1. You'll see "Create First User" page
2. Enter:
   - Email: your-email@example.com
   - Password: [Strong password]
   - Name: Your Name
3. Click "Create"

---

## 🎯 Using Payload Data in Pages

### Example: Products Page

```typescript
// src/app/[locale]/products/page.tsx
import { getProducts } from '@/lib/payload';

export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <div>
      <h1>Our Products</h1>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.tagline.en}</p>
          <img src={product.logo} alt={product.name} />
        </div>
      ))}
    </div>
  );
}
```

---

## 🔒 Production Deployment

### Vercel Environment Variables

Add to Vercel project settings:

```
PAYLOAD_SECRET=[your-secret-from-local]
MONGODB_URI=[your-mongodb-atlas-connection-string]
NEXT_PUBLIC_SERVER_URL=https://skyanalytix.ai
```

### Security Checklist

- ✅ Change PAYLOAD_SECRET to strong random value
- ✅ MongoDB Atlas: Restrict IP addresses in production
- ✅ Use strong admin passwords
- ✅ Enable 2FA on MongoDB Atlas account
- ✅ Regular database backups

---

## 📋 Admin Panel Features

Once logged in, you can:

1. **Products**
   - Add/edit products (SkyPulse, SkyHome, etc.)
   - Manage bilingual content (EN/FR)
   - Upload logos
   - Toggle published status

2. **Site Settings**
   - Update site name and tagline
   - Change contact email
   - Enable maintenance mode

3. **Users**
   - Add team members
   - Manage permissions (Admin/Editor)

---

## 🐛 Troubleshooting

### "Cannot find module @payload-config"
Run: `npm run build` - Payload generates types on build

### MongoDB connection error
Check:
1. Connection string is correct
2. Password doesn't have special characters (URL encode if needed)
3. IP whitelist includes your IP

### Admin panel 404
1. Check `(payload)` folder structure is correct
2. Verify `withPayload` in next.config.js
3. Clear `.next` folder and rebuild

---

## ✅ Next Steps After Setup

1. ✅ Access admin panel: http://localhost:3000/admin
2. ✅ Create first user
3. ✅ Add products (SkyPulse, SkyHome, SkyCloud, SkyFactory, SkyCare)
4. ✅ Update site settings
5. ✅ Test content changes reflect on frontend

---

**Setup time: ~20 minutes**
**Admin panel URL: /admin**

🚀 Ready for content management!
