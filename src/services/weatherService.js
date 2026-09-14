/**
 * ToHUM Open-Meteo Weather Service (100% Free - No API Key Required)
 */

export const fetchLocalWeather = async (latitude = 40.99, longitude = 29.02) => {
  try {
    const url = https://api.open-meteo.com/v1/forecast?latitude=&longitude=&current_weather=true;
    const response = await fetch(url);
    const data = await response.json();
    const weatherCode = data.current_weather?.weathercode || 0;
    const isRainy = [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode);
    
    return {
      temperature: Math.round(data.current_weather?.temperature || 22),
      isRainy: isRainy,
      condition: isRainy ? 'Yağmurlu / Kapalı' : 'Güneşli / Berrak',
      windSpeed: data.current_weather?.windspeed || 0,
    };
  } catch (error) {
    console.warn('Weather fetch fallback to default:', error);
    return { temperature: 21, isRainy: false, condition: 'Hafif Bulutlu' };
  }
};