import React from "react";
import Survey from "@/components/Survey";

const Index = () => {
  const handleSurveySubmit = (answer: string, customText?: string) => {
    console.log("Ответ:", answer);
    if (customText) {
      console.log("Свой вариант:", customText);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Опрос о центре досуга
          </h1>
          <p className="text-xl text-gray-600">
            Помогите нам создать идеальное место для отдыха и развития
          </p>
        </div>

        <Survey onSubmit={handleSurveySubmit} />
      </div>
    </div>
  );
};

export default Index;
