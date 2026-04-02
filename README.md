# CodeSense Frontend

AI-powered code review interface built with Next.js, React, TypeScript, and Monaco Editor.

![CodeSense](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan?logo=tailwindcss)

## Features

- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- 💻 **Monaco Editor** - Professional code editor (same as VS Code)
- 🔍 **Real-time Analysis** - Get instant feedback on your code
- 📊 **Detailed Reports** - Bugs, improvements, best practices, and suggestions
- 📝 **Code History** - Track your code reviews over time
- ⚙️ **Settings** - Customize your experience

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd codesense
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Configuration

### Connecting to Backend

The frontend needs to connect to the CodeSense Backend API. Configure the API URL:

**Development:**
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Production:**
Update your environment variables on your hosting platform:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Set environment variable: `NEXT_PUBLIC_API_URL`
5. Deploy!

### Other Platforms

Any platform that supports Next.js will work:
- Netlify
- AWS Amplify
- Railway
- Render

Make sure to set the `NEXT_PUBLIC_API_URL` environment variable.

## Project Structure

```
codesense/
├── app/                    # Next.js 14 App Router
│   ├── api/analyze/       # API route for analysis
│   ├── history/           # History page
│   ├── settings/          # Settings page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── editor/            # Code editor components
│   ├── layout/            # Layout components (Sidebar)
│   ├── review/            # Code review components
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── store/                 # Zustand state management
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Code Editor:** Monaco Editor
- **Icons:** Lucide React
- **Notifications:** Sonner

## Backend Integration

This frontend connects to the CodeSense Backend API which provides:
- AI-powered code analysis
- Code review history storage
- Best practices suggestions

See the [CodeSense Backend](../codesense-backend) repository for backend setup.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8000` |

## Troubleshooting

### Cannot connect to backend
- Verify `NEXT_PUBLIC_API_URL` is correct
- Ensure backend server is running
- Check CORS settings in backend

### Monaco Editor not loading
- Clear browser cache
- Check browser console for errors
- Verify worker configuration in `next.config.js`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your needs.

## Acknowledgments

Built with ❤️ using Next.js and modern web technologies.
