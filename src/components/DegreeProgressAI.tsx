import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Bot, Send, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface DegreeProgressAIProps {
  studentData: {
    name: string;
    major: string;
    minor?: string;
    currentYear: string;
    overallGPA: number;
    majorGPA: number;
    totalCreditsRequired: number;
    creditsCompleted: number;
    creditsInProgress: number;
    expectedGraduation: string;
  };
  requirements: Array<{
    category: string;
    required: number;
    completed: number;
    inProgress: number;
  }>;
}

export function DegreeProgressAI({ studentData, requirements }: DegreeProgressAIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hi! I'm your Degree Progress AI Assistant. I can help you understand your academic progress, answer questions about your requirements, and provide guidance on your path to graduation. What would you like to know?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Calculate progress
    const totalProgress = (studentData.creditsCompleted / studentData.totalCreditsRequired) * 100;
    const creditsRemaining = studentData.totalCreditsRequired - studentData.creditsCompleted - studentData.creditsInProgress;

    // GPA related questions
    if (lowerMessage.includes("gpa") || lowerMessage.includes("grade")) {
      if (lowerMessage.includes("improve") || lowerMessage.includes("raise") || lowerMessage.includes("increase")) {
        return `Your current overall GPA is ${studentData.overallGPA}, and your major GPA is ${studentData.majorGPA}. To improve your GPA, focus on:\n\n1. Completing all assignments and studying consistently\n2. Attending office hours for challenging courses\n3. Forming study groups with classmates\n4. Taking advantage of tutoring resources\n\nYour major GPA of ${studentData.majorGPA} is strong! Keep up the excellent work in your ${studentData.major} courses.`;
      }
      return `Your current overall GPA is ${studentData.overallGPA}, which is excellent! Your major GPA in ${studentData.major} is ${studentData.majorGPA}. You're performing very well academically. Is there anything specific about your GPA you'd like to know?`;
    }

    // Progress and completion questions
    if (lowerMessage.includes("progress") || lowerMessage.includes("how far") || lowerMessage.includes("close")) {
      return `You've made great progress! Here's your current status:\n\n• Total Credits: ${studentData.creditsCompleted} of ${studentData.totalCreditsRequired} completed (${totalProgress.toFixed(1)}%)\n• Credits in Progress: ${studentData.creditsInProgress}\n• Credits Remaining: ${creditsRemaining}\n\nYou're currently a ${studentData.currentYear} with an expected graduation in ${studentData.expectedGraduation}. You're on track!`;
    }

    // Requirements questions
    if (lowerMessage.includes("requirement") || lowerMessage.includes("need to take") || lowerMessage.includes("still need")) {
      const incomplete = requirements.filter(r => r.completed < r.required);
      if (incomplete.length === 0) {
        return `Great news! You've completed all your major requirement categories. You just need ${creditsRemaining} more elective credits to reach the ${studentData.totalCreditsRequired} total credits required for graduation.`;
      }
      let response = "Here's what you still need to complete:\n\n";
      incomplete.forEach(req => {
        const remaining = req.required - req.completed - req.inProgress;
        response += `• ${req.category}: ${remaining} credits remaining\n`;
      });
      return response + `\nYou're making excellent progress toward your ${studentData.major} degree!`;
    }

    // Graduation questions
    if (lowerMessage.includes("graduate") || lowerMessage.includes("graduation") || lowerMessage.includes("finish")) {
      const onTrack = creditsRemaining <= 21; // Can finish in 1.5 semesters with normal load
      return `You're expected to graduate in ${studentData.expectedGraduation}. With ${creditsRemaining} credits remaining after your current courses, you ${onTrack ? "are" : "may need to adjust your plan to stay"} on track.\n\n${onTrack ? "At a normal course load of 15 credits per semester, you should be able to complete your degree on time!" : "Consider meeting with your academic advisor to plan your remaining semesters."}`;
    }

    // Major/Minor questions
    if (lowerMessage.includes("major") || lowerMessage.includes("minor")) {
      const majorReq = requirements.find(r => r.category === "Major Requirements");
      const minorReq = requirements.find(r => r.category.includes("Minor"));
      
      let response = `You're majoring in ${studentData.major}`;
      if (studentData.minor) {
        response += ` with a minor in ${studentData.minor}`;
      }
      response += ".\n\n";
      
      if (majorReq) {
        const majorRemaining = majorReq.required - majorReq.completed - majorReq.inProgress;
        response += `Major Progress: ${majorReq.completed} of ${majorReq.required} credits completed (${((majorReq.completed / majorReq.required) * 100).toFixed(1)}%)\n`;
        if (majorRemaining > 0) {
          response += `You have ${majorRemaining} major credits remaining.\n`;
        }
      }
      
      if (minorReq) {
        const minorRemaining = minorReq.required - minorReq.completed - minorReq.inProgress;
        response += `\nMinor Progress: ${minorReq.completed} of ${minorReq.required} credits completed\n`;
        if (minorRemaining > 0) {
          response += `You have ${minorRemaining} minor credits remaining.`;
        }
      }
      
      return response;
    }

    // Course load questions
    if (lowerMessage.includes("course load") || lowerMessage.includes("how many") || lowerMessage.includes("credits per")) {
      return `You currently have ${studentData.creditsInProgress} credits in progress this semester. With ${creditsRemaining} credits remaining after this semester, I'd recommend:\n\n• If graduating in 2 semesters: Take about ${Math.ceil(creditsRemaining / 2)} credits per semester\n• If graduating in 3 semesters: Take about ${Math.ceil(creditsRemaining / 3)} credits per semester\n\nA typical full-time load is 12-15 credits. Plan with your advisor to find the right balance!`;
    }

    // General education questions
    if (lowerMessage.includes("general ed") || lowerMessage.includes("gen ed") || lowerMessage.includes("ge ")) {
      const genEd = requirements.find(r => r.category === "General Education");
      if (genEd) {
        if (genEd.completed >= genEd.required) {
          return `Excellent news! You've completed all ${genEd.required} credits of General Education requirements. You can now focus entirely on your major, minor, and elective courses.`;
        }
        return `You've completed ${genEd.completed} of ${genEd.required} General Education credits, with ${genEd.inProgress} in progress. You have ${genEd.required - genEd.completed - genEd.inProgress} GE credits remaining.`;
      }
      return "I don't see General Education requirements in your data. This might be completed or organized differently in your program.";
    }

    // Advice and planning questions
    if (lowerMessage.includes("advice") || lowerMessage.includes("recommend") || lowerMessage.includes("should i")) {
      return `Based on your excellent academic performance (${studentData.overallGPA} GPA), here's my advice:\n\n1. Keep maintaining your strong grades - you're doing great!\n2. Consider taking on research opportunities or internships in ${studentData.major}\n3. Build relationships with professors for strong recommendation letters\n4. Plan your remaining ${creditsRemaining} credits strategically to explore interests\n5. Stay connected with your academic advisor for personalized guidance\n\nYou're on an excellent path toward graduation in ${studentData.expectedGraduation}!`;
    }

    // Electives questions
    if (lowerMessage.includes("elective")) {
      const electives = requirements.find(r => r.category === "Electives");
      if (electives) {
        const remaining = electives.required - electives.completed - electives.inProgress;
        if (remaining > 0) {
          return `You need ${remaining} elective credits. This is a great opportunity to:\n\n• Explore subjects you're curious about\n• Take courses that complement your major\n• Develop additional skills for your career\n• Fulfill a personal academic interest\n\nChoose electives that excite you and align with your goals!`;
        }
        return "You've completed your elective requirements! Great job exploring diverse subjects.";
      }
      return "Elective information isn't currently available in your degree plan.";
    }

    // Default response for other questions
    return `I'd be happy to help you with that! I can provide information about:\n\n• Your overall progress and GPA\n• Specific requirement categories\n• Graduation timeline and planning\n• Course recommendations\n• Academic advice\n\nCould you be more specific about what you'd like to know? For example, you could ask:\n- "How close am I to graduation?"\n- "What requirements do I still need?"\n- "How's my GPA?"\n- "What should I focus on?"`;
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const response = generateResponse(input.trim());
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="shadow-xl border-2 border-purple-200 bg-white/90 backdrop-blur-sm">
      <CardHeader className="border-b bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              Degree Progress AI Assistant
            </CardTitle>
            <CardDescription className="text-purple-700">
              Ask me anything about your academic progress
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Fixed height container */}
        <div className="flex flex-col h-[600px]">
          {/* Messages area - scrollable */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
            style={{ maxHeight: '480px' }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-full h-9 w-9 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 shadow-md ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white"
                      : "bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 border border-purple-200"
                  }`}
                >
                  <p className="whitespace-pre-line text-sm">{message.content}</p>
                  <p
                    className={`mt-1 text-xs ${
                      message.role === "user"
                        ? "text-blue-100"
                        : "text-slate-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-full h-9 w-9 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-full h-9 w-9 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-3 border border-purple-200">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input area - fixed at bottom */}
          <div className="border-t p-4 bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your degree progress..."
                className="flex-1 border-purple-300 focus:border-purple-500"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-2 text-center text-gray-600 text-sm">
              Try asking: "How close am I to graduation?" or "What requirements do I still need?"
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}