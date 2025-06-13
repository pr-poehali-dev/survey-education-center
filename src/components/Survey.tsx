import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface SurveyProps {
  onSubmit?: (answer: string, customText?: string) => void;
}

const Survey: React.FC<SurveyProps> = ({ onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [customText, setCustomText] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const options = [
    { id: "rest", label: "Отдых и общение" },
    { id: "sport", label: "Спорт и активности" },
    { id: "education", label: "Образование и развитие" },
    { id: "food", label: "Еда" },
    { id: "culture", label: "Культурные и международные мероприятия" },
    { id: "custom", label: "Свой вариант" },
  ];

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
          <p className="text-gray-600">
            Ваш ответ учтён. Мы обязательно рассмотрим все предложения.
          </p>
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

      <CardContent className="space-y-6">
        <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
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
      </CardContent>
    </Card>
  );
};

export default Survey;
