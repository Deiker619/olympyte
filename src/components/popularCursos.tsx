import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Course {
  id: number;
  name: string;
  genre: string;
  students: number;
  rating: number;
  rank: number;
}

const mockCourses: Course[] = [
  { id: 1, name: "Salsa Cubana Básica", genre: "Salsa", students: 24, rating: 4.8, rank: 1 },
  { id: 2, name: "Bachata Sensual", genre: "Bachata", students: 22, rating: 4.7, rank: 2 },
  { id: 3, name: "Merengue Tradicional", genre: "Merengue", students: 18, rating: 4.6, rank: 3 },
  { id: 4, name: "Reggaeton Moderno", genre: "Reggaeton", students: 16, rating: 4.5, rank: 4 },
  { id: 5, name: "Tango Argentino", genre: "Tango", students: 12, rating: 4.4, rank: 5 },
];

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1: return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black";
    case 2: return "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800";
    case 3: return "bg-gradient-to-r from-amber-600 to-amber-700 text-white";
    default: return "bg-muted text-muted-foreground";
  }
};

export function PopularCourses() {
  return (
    <Card className="card-dashboard border-none">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-primary" />
          <span>Cursos Más Populares</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockCourses.map((course, index) => (
          <div
            key={course.id}
            className={cn(
              "flex items-center justify-between p-4 rounded-lg border transition-colors hover:bg-accent-light/20",
              "animate-fade-in"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center space-x-4">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                  getRankColor(course.rank)
                )}
              >
                {course.rank}
              </div>
              <div>
                <p className="font-medium text-foreground">{course.name}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary" className="text-xs">{course.genre}</Badge>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>{course.students} estudiantes</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-primary fill-current" />
              <span className="text-sm font-medium">{course.rating}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}