# 🤖 AI-Powered Chatbot with React & n8n

A modern, responsive chatbot application built with **React** and **Vite**, integrated with an **n8n workflow** that provides intelligent responses using **OpenAI GPT-4**, **vector database search**, and **conversation memory**.

## 🚀 Features

### Frontend Features
- ✅ **Modern React UI** with hooks (useState, useRef, useEffect)
- ✅ **Clean Blue-themed Design** with gradients and animations
- ✅ **Responsive Layout** - works on desktop and mobile
- ✅ **Real-time Chat Interface** with user/bot message distinction
- ✅ **Auto-scroll** to latest messages
- ✅ **Session Management** with unique session IDs
- ✅ **Enter key support** for quick message sending
- ✅ **Input validation** and error handling

### Backend/AI Features
- 🧠 **OpenAI GPT-4.1-mini** for intelligent responses
- 🗄️ **Supabase Vector Database** for knowledge retrieval
- 💾 **PostgreSQL Memory** for conversation context
- 📁 **Google Drive Integration** for document processing
- 🔍 **Semantic Search** through uploaded documents
- 🔄 **Session-based Conversations** with memory persistence

## 📁 Project Structure

```
my-react-app/
├── public/
│   └── vite.svg                 # Vite logo
├── src/
│   ├── assets/                  # Static assets
│   ├── App.css                  # Main stylesheet with blue theme
│   ├── App.jsx                  # Main React component with chatbot logic
│   ├── index.css                # Global styles and layout
│   └── main.jsx                 # React app entry point
├── .gitignore                   # Git ignore rules
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── package-lock.json            # Locked dependency versions
├── README.md                    # This file
└── vite.config.js              # Vite configuration
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd my-react-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Frontend Configuration

The chatbot sends requests to the n8n webhook with this JSON structure:

```json
{
  "message": "User's question here",
  "sessionId": "session_1754606057170_s97anb0k2",
  "timestamp": "2025-08-08T21:45:30.123Z"
}
```

### n8n Webhook URL
```
https://anythingman.app.n8n.cloud/webhook/chatbot
```

## 🤖 n8n Workflow Architecture

The backend is powered by a sophisticated n8n workflow that processes chat requests through multiple AI and database operations:

### Workflow Components

#### 1. **Webhook Trigger** (`Webhook1`)
- **Path**: `/chatbot`
- **Method**: POST
- **Purpose**: Receives chat messages from React frontend
- **Input**: `{ message, sessionId, timestamp }`

#### 2. **AI Agent** (`AI Agent1`)
- **Model**: OpenAI GPT-4.1-mini
- **System Prompt**: AI assistant with access to knowledge base
- **Purpose**: Orchestrates the response using available tools and memory

#### 3. **Language Model** (`OpenAI1`)
- **Model**: GPT-4.1-mini
- **Provider**: OpenAI API
- **Purpose**: Generates intelligent responses

#### 4. **Memory System** (`Postgres1`)
- **Type**: PostgreSQL Chat Memory
- **Session Key**: `{{ $json.body.sessionId }}`
- **Purpose**: Maintains conversation context across messages

#### 5. **Vector Database** (`Supabase1`)
- **Mode**: Retrieve-as-tool
- **Table**: `documents`
- **Purpose**: Semantic search through uploaded documents
- **Embeddings**: OpenAI Embeddings

#### 6. **Document Processing Pipeline**
- **Google Drive Integration** (`Search files and folders1`)
  - **Folder ID**: `1ObV3x-xd-vb57Gcg8XqBuJSYBIYwjEPI`
  - **Purpose**: Access documents from Google Drive

- **File Download** (`Download file1`)
  - **Purpose**: Download files for processing

- **Document Loader** (`Default Data Loader1`)
  - **Type**: Binary data loader
  - **Purpose**: Process various document formats

- **Vector Storage** (`Supabase Vector Store1`)
  - **Mode**: Insert
  - **Table**: `documents`
  - **Purpose**: Store document embeddings for search

#### 7. **Response Handler** (`Respond to Webhook1`)
- **Purpose**: Returns AI response to frontend
- **Format**: `{ "output": "AI response text" }`

### Workflow Process Flow

1. **Input**: React app sends message via webhook
2. **Memory**: Retrieves conversation history using sessionId
3. **Search**: Performs semantic search in vector database
4. **AI Processing**: GPT-4 generates response using context + retrieved docs
5. **Output**: Returns formatted response to frontend

### Required Credentials

- **OpenAI API** - For GPT-4 and embeddings
- **Supabase** - For vector database storage
- **PostgreSQL** - For conversation memory
- **Google Drive OAuth2** - For document access

## 🎨 UI/UX Features

### Design System
- **Color Scheme**: Blue tones with gradients
- **Typography**: Segoe UI font family
- **Layout**: Flexbox-based responsive design
- **Animations**: Smooth transitions and hover effects

### Components
- **Chat Header**: Gradient blue header with title
- **Messages Container**: Scrollable area with auto-scroll
- **Message Bubbles**: Distinct styling for user/bot messages
- **Input Area**: Text input with send button
- **Custom Scrollbar**: Blue-themed scrollbar

### Responsive Breakpoints
- **Desktop**: Full-width with max 800px container
- **Mobile**: Full-screen layout with optimized spacing

## 🔧 Technical Implementation

### Frontend Technologies
- **React 19.1.1** with hooks
- **Vite 7.1.0** for fast development
- **CSS3** with custom properties and flexbox
- **Fetch API** for HTTP requests

### Key React Features Used
- `useState` for state management
- `useRef` for DOM manipulation
- `useEffect` for side effects
- Event handling for user interactions
- Async/await for API calls

### Error Handling
- Network request failures
- Empty responses
- JSON parsing errors
- User-friendly error messages

## 🚀 Deployment

### Frontend Deployment
Can be deployed to:
- **Vercel** (recommended for Vite projects)
- **Netlify**
- **GitHub Pages**
- **Any static hosting service**

### n8n Workflow
- Hosted on n8n Cloud
- Webhook URL: `https://anythingman.app.n8n.cloud/webhook/chatbot`

## 📝 Usage Example

1. **Start the application**
2. **Type a message** in the input field
3. **Press Enter** or click Send
4. **AI processes** the request through n8n workflow
5. **Response appears** in the chat with relevant information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues or questions:
- Check the console logs for detailed error information
- Verify n8n webhook is responding correctly
- Ensure all credentials are properly configured

---

**Built with ❤️ using React, Vite, and n8n**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
