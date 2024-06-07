import React, { useState, useEffect } from 'react';
import './WeatherThemeProvider.css'
import '../LeftSidebar/LeftSidebar'
import '../../pages/AskQuestion/AskQuestion'
import '../../pages/Tags/Tags'
import '../../pages/Users/Users'
import '../../pages/Auth/Auth'
import '../CustomVideoPlayer/CustomVideoPlayer'


const WeatherThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState ('light');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Get user's current location
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        });

        // Fetch weather data if location is available
        if (latitude !== null && longitude !== null) {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=dd9824bef258adf79661f4f51fff5cfc`
          );
          const data = await response.json();

          // Extract weather conditions from the API response
          const { weather } = data;
          const currentTime = new Date().getHours();

          // Check if it's daytime and weather conditions
          if ((currentTime > 6 && currentTime < 18) || weather[0].main === 'Clear') {
            setTheme('light');
          } else {
            setTheme('dark');
          }
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  return (
    <div className={`app ${theme}`}>
      {children}
    </div>
  );
};

export default WeatherThemeProvider;


