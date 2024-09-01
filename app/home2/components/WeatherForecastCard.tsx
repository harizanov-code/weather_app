import React from 'react';

interface WeatherCardProps {
  date: string;
  day: string;
  temperature: string;
  condition: string;
  wind: string;
  humidity: string;
  iconSrc: string;
  altText: string;
}

const WeatherCard = ({ 
  date, 
  day, 
  temperature, 
  condition, 
  wind, 
  humidity, 
  iconSrc, 
  altText 
}: WeatherCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{day}</h3>
          <p className="text-gray-500">{date}</p>
        </div>
        <img
          src={iconSrc}
          alt={altText}
          width="40"
          height="40"
          className="h-10 w-10"
          style={{ aspectRatio: '40/40', objectFit: 'cover' }}
        />
      </div>
      <div className="flex items-center justify-between mt-4">
        <div>
          <p className="text-4xl font-bold">{temperature}</p>
          <p className="text-gray-500">{condition}</p>
        </div>
        <div>
          <p className="text-gray-500">Wind: {wind}</p>
          <p className="text-gray-500">Humidity: {humidity}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
