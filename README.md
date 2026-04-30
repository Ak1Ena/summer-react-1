# 💰 Expense Tracker Pro

A modern, responsive expense tracking application built with React 19 and Vite.

![App Screenshot](https://via.placeholder.com/800x450?text=Expense+Tracker+Pro+Screenshot)

## 🚀 Features

- **Expense Management**: Add, edit, and delete transactions.
- **Visual Analytics**: Dynamic spending chart by category.
- **Budgeting**: Set a monthly budget and track your progress.
- **Categorization**: Filter expenses by category (Food, Transport, Health, etc.).
- **Data Export**: Export your transaction list to CSV.
- **Dark Mode**: Support for light and dark themes using CSS Modules.
- **Weather Integration**: Displays current weather using OpenWeather API.
- **Responsive Design**: Optimized for both desktop and mobile.

## 🛠️ Tech Stack

- **React 19** (Functional Components, Hooks, Context API)
- **Vite** (Build Tool)
- **CSS Modules** (Scoped Styling)
- **OpenWeather API** (Weather Data)

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Add your OpenWeather API key in `.env`.
5. Start the development server:
   ```bash
   npm run dev
   ```

## 🔐 Environment Variables

- `VITE_APP_APP_TITLE`: The title shown in the header.
- `VITE_APP_VERSION`: Current version of the app.
- `VITE_OPENWEATHER_API_KEY`: Your API key from [OpenWeatherMap](https://openweathermap.org/api).
- `VITE_WEATHER_CITY`: The city for which weather is displayed.

## 📝 License

MIT
