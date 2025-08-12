import { InstructoresContext } from "@/contexts/Instructores/InstructoresContext";
import { useContext } from "react";

export const useInstructores = () => {
  const context = useContext(InstructoresContext);
  if (!context) {
    throw new Error("useInstructoresContext debe usarse dentro de un useInstructoresContext");
  }
  return context;
};