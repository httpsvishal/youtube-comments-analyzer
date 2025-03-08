# YouTube Comments Analyzer

This is a Next.js project that analyzes YouTube comments from a given video link. It performs sentiment analysis and classifies comments using Gemini AI.

## Features
- Analyze YouTube comments by providing a video link.
- Classify comments based on sentiment.
- Display insights through visual charts.
- Efficient MongoDB integration for data storage.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/youtube-comments-analyzer.git
   ```

2. Navigate to the project directory:
   ```bash
   cd youtube-comments-analyzer
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:

```
YOUTUBE_API_KEY=your_youtube_api_key
MONGODB_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## Project Structure
```
/src
 └── app
     ├── api
     │   └── get-comments
     │       └── route.js
     ├── dashboard
     │   ├── favicon.ico
     │   ├── globals.css
     │   ├── layout.js
     │   └── page.js
     ├── components
     │   ├── ui
     │   │   ├── CustomAreaChart.jsx
     │   │   └── Spinner.jsx
     │   └── context
     │       └── DataContext.js
     ├── lib
     │   ├── data.json
     │   └── utils.js
```

## Usage
1. Enter a valid YouTube video link in the provided field.
2. The app will fetch comments, classify them, and present visual insights.

## Technologies Used
- **Next.js** — Frontend framework
- **MongoDB** — Database for comment storage
- **Gemini AI** — For comment classification
- **YouTube API** — For fetching comments

## Testing
To run the project with test data (useful for development), the `data.json` file in `/lib` can be used. However, it is not required for production.

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.

