import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SurveyProps {
  onSubmit?: (answer: string, customText?: string) => void;
}

const Survey: React.FC<SurveyProps> = ({ onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [customText, setCustomText] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("vote");

  const options = [
    { id: "rest", label: "Отдых и общение" },
    { id: "sport", label: "Спорт и активности" },
    { id: "education", label: "Образование и развитие" },
    { id: "food", label: "Еда" },
    { id: "culture", label: "Культурные и международные мероприятия" },
    { id: "custom", label: "Свой вариант" },
  ];

  // Моковые данные результатов
  const surveyResults = {
    totalVotes: 147,
    results: [
      { id: "rest", label: "Отдых и общение", votes: 42, percentage: 28.6 },
      { id: "sport", label: "Спорт и активности", votes: 35, percentage: 23.8 },
      {
        id: "education",
        label: "Образование и развитие",
        votes: 31,
        percentage: 21.1,
      },
      { id: "food", label: "Еда", votes: 18, percentage: 12.2 },
      {
        id: "culture",
        label: "Культурные и международные мероприятия",
        votes: 12,
        percentage: 8.2,
      },
      { id: "custom", label: "Свой вариант", votes: 9, percentage: 6.1 },
    ],
    customAnswers: [
      "Мастер-классы по рукоделию и творчеству",
      "Коворкинг пространство для работы",
      "Библиотека с тихими зонами для чтения",
      "Игровая зона с настольными играми",
      "Концерты живой музыки",
      "Лекции и дискуссии на актуальные темы",
      "Зона для медитации и йоги",
      "Детская игровая комната",
      "Танцевальные вечера",
    ],
  };

  const handleSubmit = () => {
    if (
      !selectedOption ||
      (selectedOption === "custom" && !customText.trim())
    ) {
      return;
    }

    setIsSubmitted(true);
    onSubmit?.(
      selectedOption,
      selectedOption === "custom" ? customText : undefined,
    );
  };

  const handleCustomTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const text = e.target.value;
    if (text.length <= 250) {
      setCustomText(text);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto animate-fade-in">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Спасибо за участие!
          </h2>
          <p className="text-gray-600 mb-4">
            Ваш ответ учтён. Мы обязательно рассмотрим все предложения.
          </p>
          <Button
            onClick={() => setActiveTab("results")}
            variant="outline"
            className="mt-2"
          >
            Посмотреть результаты
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-semibold text-gray-800 leading-relaxed">
          Если бы был образовательный центр досуга, что бы вас привлекло туда
          пойти?
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="vote">Голосование</TabsTrigger>
            <TabsTrigger value="results">
              Результаты ({surveyResults.totalVotes})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vote" className="space-y-6 mt-6">
            <RadioGroup
              value={selectedOption}
              onValueChange={setSelectedOption}
            >
              {options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                  <label
                    htmlFor={option.id}
                    className="text-gray-700 cursor-pointer flex-1 font-medium"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>

            {selectedOption === "custom" && (
              <div className="space-y-2 animate-fade-in">
                <Textarea
                  placeholder="Поделитесь своим вариантом..."
                  value={customText}
                  onChange={handleCustomTextChange}
                  className="min-h-[100px] resize-none"
                />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Опишите свой вариант</span>
                  <span
                    className={`font-medium ${customText.length > 240 ? "text-red-500" : "text-gray-500"}`}
                  >
                    {customText.length}/250
                  </span>
                </div>
              </div>
            )}

            <Button
              onClick={handleSubmit}
              disabled={
                !selectedOption ||
                (selectedOption === "custom" && !customText.trim())
              }
              className="w-full py-3 text-lg font-medium bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              Отправить ответ
            </Button>
          </TabsContent>

          <TabsContent value="results" className="space-y-6 mt-6">
            <div className="text-center mb-6">
              <p className="text-lg font-medium text-gray-700">
                Всего проголосовало:{" "}
                <span className="text-purple-600 font-bold">
                  {surveyResults.totalVotes}
                </span>{" "}
                человек
              </p>
            </div>

            <div className="space-y-4">
              {surveyResults.results.map((result) => (
                <div key={result.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">
                      {result.label}
                    </span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-purple-600">
                        {result.percentage}%
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        ({result.votes} голосов)
                      </span>
                    </div>
                  </div>
                  <Progress value={result.percentage} className="h-3" />
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">
                Пользовательские варианты ({surveyResults.customAnswers.length})
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {surveyResults.customAnswers.map((answer, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-purple-600 font-bold text-sm mt-0.5">
                      •
                    </span>
                    <span className="text-gray-700 text-sm">{answer}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Survey;
