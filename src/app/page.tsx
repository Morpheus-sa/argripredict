"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  BarChart3,
  Brain,
  Database,
  LineChart,
  Smartphone,
  AlertTriangle,
  Droplets,
  Sun,
  Wind,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toast } from "@/components/ui/toast";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Mock data for price predictions
const mockPredictions = {
  wheat: {
    "1week": [
      { date: "2024-03-01", price: 220, confidence: 0.95 },
      { date: "2024-03-02", price: 225, confidence: 0.93 },
      { date: "2024-03-03", price: 223, confidence: 0.94 },
      { date: "2024-03-04", price: 228, confidence: 0.92 },
      { date: "2024-03-05", price: 230, confidence: 0.91 },
      { date: "2024-03-06", price: 227, confidence: 0.93 },
      { date: "2024-03-07", price: 232, confidence: 0.9 },
    ],
    "1month": [
      { date: "2024-03-01", price: 220, confidence: 0.95 },
      { date: "2024-03-08", price: 225, confidence: 0.92 },
      { date: "2024-03-15", price: 230, confidence: 0.9 },
      { date: "2024-03-22", price: 228, confidence: 0.88 },
      { date: "2024-03-29", price: 235, confidence: 0.85 },
    ],
    "3months": [
      { date: "2024-03-01", price: 220, confidence: 0.95 },
      { date: "2024-04-01", price: 228, confidence: 0.85 },
      { date: "2024-05-01", price: 235, confidence: 0.8 },
      { date: "2024-06-01", price: 240, confidence: 0.75 },
    ],
  },
  // ... (similar data for corn and soybeans)
};

// Mock weather data
const mockWeatherData = {
  temperature: [20, 22, 21, 23, 25, 24, 22],
  rainfall: [0, 5, 10, 2, 0, 0, 15],
  humidity: [50, 55, 60, 58, 52, 48, 65],
};

// Mock news data
const mockNewsData = [
  {
    title: "Global wheat shortage expected",
    impact: "high",
    sentiment: "negative",
  },
  {
    title: "New sustainable farming techniques boost yield",
    impact: "medium",
    sentiment: "positive",
  },
  {
    title: "Trade agreement to affect grain prices",
    impact: "high",
    sentiment: "neutral",
  },
];

export default function Component() {
  const [selectedCrop, setSelectedCrop] = useState<string>("wheat");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("1week");
  const [predictionData, setPredictionData] = useState<
    Array<{ date: string; price: number; confidence: number }>
  >([]);
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(0.8);
  const [showConfidenceInterval, setShowConfidenceInterval] =
    useState<boolean>(false);
  const [weatherImpact, setWeatherImpact] = useState<boolean>(true);
  const [newsAlerts, setNewsAlerts] = useState<boolean>(true);

  useEffect(() => {
    handlePrediction();
  }, [selectedCrop, selectedTimeframe, confidenceThreshold, weatherImpact]);

  const handleCropChange = (value: string) => {
    setSelectedCrop(value);
  };

  const handleTimeframeChange = (value: string) => {
    setSelectedTimeframe(value);
  };

  const handlePrediction = () => {
    if (selectedCrop && selectedTimeframe) {
      // Simulate API call with added complexity
      setTimeout(() => {
        let predictions =
          mockPredictions[selectedCrop as keyof typeof mockPredictions][
            selectedTimeframe as keyof (typeof mockPredictions)["wheat"]
          ];

        // Apply confidence threshold
        predictions = predictions.filter(
          (p) => p.confidence >= confidenceThreshold
        );

        // Simulate weather impact
        if (weatherImpact) {
          predictions = predictions.map((p, i) => ({
            ...p,
            price:
              p.price *
              (1 +
                (mockWeatherData.temperature[i] - 22) / 100 +
                mockWeatherData.rainfall[i] / 1000),
          }));
        }

        setPredictionData(predictions);
      }, 1000);
    }
  };

  const renderWeatherData = () => (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Temperature</CardTitle>
          <Sun className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {mockWeatherData.temperature[0]}°C
          </div>
          <p className="text-xs text-muted-foreground">+2°C from last week</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rainfall</CardTitle>
          <Droplets className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {mockWeatherData.rainfall[0]}mm
          </div>
          <p className="text-xs text-muted-foreground">-5mm from last week</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Humidity</CardTitle>
          <Wind className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {mockWeatherData.humidity[0]}%
          </div>
          <p className="text-xs text-muted-foreground">+5% from last week</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderNewsAlerts = () => (
    <div className="space-y-4 mt-4">
      {mockNewsData.map((news, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{news.title}</CardTitle>
            <AlertTriangle
              className={`h-4 w-4 ${
                news.impact === "high" ? "text-red-500" : "text-yellow-500"
              }`}
            />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Impact: {news.impact}, Sentiment: {news.sentiment}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        AgriPredict: Advanced AI-Powered Agricultural Market Insights
      </h1>

      <Tabs defaultValue="prediction" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="prediction">Price Prediction</TabsTrigger>
          <TabsTrigger value="analysis">Market Analysis</TabsTrigger>
          <TabsTrigger value="settings">AI Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="prediction">
          <Card>
            <CardHeader>
              <CardTitle>Price Prediction Dashboard</CardTitle>
              <CardDescription>
                Analyze and predict agricultural commodity prices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Select
                    onValueChange={handleCropChange}
                    defaultValue={selectedCrop}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="corn">Corn</SelectItem>
                      <SelectItem value="soybeans">Soybeans</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={handleTimeframeChange}
                    defaultValue={selectedTimeframe}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1week">1 Week</SelectItem>
                      <SelectItem value="1month">1 Month</SelectItem>
                      <SelectItem value="3months">3 Months</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handlePrediction}>Update Prediction</Button>
                </div>
                <div className="h-[400px] bg-gray-100 rounded-lg">
                  {predictionData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={predictionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke="#8884d8"
                          name="Predicted Price"
                        />
                        {showConfidenceInterval && (
                          <Line
                            type="monotone"
                            dataKey="confidence"
                            stroke="#82ca9d"
                            name="Confidence"
                          />
                        )}
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <span className="text-gray-500">
                        Select parameters to see price predictions
                      </span>
                    </div>
                  )}
                </div>
                {weatherImpact && renderWeatherData()}
                {newsAlerts && renderNewsAlerts()}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Market Analysis</CardTitle>
              <CardDescription>
                Detailed insights into market trends and factors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Advanced market analysis features would be implemented here,
                such as:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Correlation analysis between different crops</li>
                <li>Impact of global events on commodity prices</li>
                <li>Supply and demand forecasts</li>
                <li>Historical price trend analysis</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>AI Model Settings</CardTitle>
              <CardDescription>
                Customize the AI prediction model parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="confidence-threshold">
                    Confidence Threshold
                  </Label>
                  <Slider
                    id="confidence-threshold"
                    min={0}
                    max={1}
                    step={0.05}
                    value={[confidenceThreshold]}
                    onValueChange={(value) => setConfidenceThreshold(value[0])}
                    className="w-[60%]"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-confidence"
                    checked={showConfidenceInterval}
                    onCheckedChange={setShowConfidenceInterval}
                  />
                  <Label htmlFor="show-confidence">
                    Show Confidence Interval
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="weather-impact"
                    checked={weatherImpact}
                    onCheckedChange={setWeatherImpact}
                  />
                  <Label htmlFor="weather-impact">Include Weather Impact</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="news-alerts"
                    checked={newsAlerts}
                    onCheckedChange={setNewsAlerts}
                  />
                  <Label htmlFor="news-alerts">Show News Alerts</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  );
}
