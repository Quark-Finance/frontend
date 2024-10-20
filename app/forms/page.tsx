'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, ChevronRight, ChevronLeft, User, TrendingUp, Coins } from 'lucide-react'
import { questions } from '@/lib/formulaireQuestions'
import { createRiskProfileAttestation } from "./sign/attestation";
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
type FormData = Record<string, string>

const steps = [
  { id: 'personalProfile', title: 'Personal Profile', icon: User },
  { id: 'investmentPreferences', title: 'Investment Preferences', icon: TrendingUp },
  { id: 'web3Profile', title: 'Web3 Profile', icon: Coins },
]

export default function InvestmentProfileForm() {
  const { user } = useDynamicContext();

  const verifiedCredentialsArray = user?.verifiedCredentials as any;

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const form = useForm<FormData>({
    defaultValues: questions.reduce((acc, q) => ({ ...acc, [q.id]: '' }), {}),
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const updatedAnswers = { ...answers, ...data }
    setAnswers(updatedAnswers)
    
    const totalScore = questions.reduce((sum, question) => {
      const selectedOption = question.options.find(option => option.value === updatedAnswers[question.id])
      return sum + (selectedOption ? selectedOption.score : 0)
    }, 0)

    const maxScore = questions.length * 5
    let scorePercentage = (totalScore / maxScore) * 100

    let investorProfile
    if (scorePercentage < 40) {
      investorProfile = 'Conservative'
    } else if (scorePercentage < 70) {
      investorProfile = 'Moderate'
    } else {
      investorProfile = 'Aggressive'
    }

    const qaStructure = questions.reduce((acc, q) => ({
      ...acc,
      [q.question]: updatedAnswers[q.id]
    }), {})

    console.log('Form Data:', data)
    console.log('Q&A Structure:', qaStructure)
    const RP = await RiskProfileGenerator(qaStructure)
    console.log('Investor Profile:', investorProfile)
    createRiskProfileAttestation("0x02f37D3C000Fb5D2A824a3dc3f1a29fa5530A8D4", ["ageGroup", "investmentGoals", "riskTolerance", "investmentHorizon", "incomeStability", "investmentKnowledge", "portfolioAllocation", "marketDownturn", "emergencyFund", "retirementPlanning", "cryptoExperience", "defiKnowledge", "nftInterest", "web3Adoption"], Math.floor(scorePercentage));
    // Submit data to backend
  }

  const RiskProfileGenerator = async (qaStructure: any) => {
    console.log('Generating Risk Profile...')
    const response = await fetch('/api/generate-score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `
        We have collected responses from an investor risk and profile assessment questionnaire. Each response corresponds to a score that reflects the investor's risk tolerance, investment goals, knowledge, and experience with modern technologies like cryptocurrency and DeFi. 

        Here are the questions and the user's selected answers:
        ${JSON.stringify(qaStructure, null, 2)}

        Each question has been assigned a score (ranging from 1 to 5) that reflects how conservative or aggressive the investor is. The total possible score is 65, and the actual score should be calculated by summing up the scores of the selected answers.

        Please calculate:
        1. The total score based on the selected answers.
        2. The percentage score by dividing the actual score by the total possible score (65) and multiplying by 100.
        3. Based on the percentage score, provide a brief risk profile interpretation:
          - 0-20%: Very conservative investor with low risk tolerance.
          - 21-40%: Conservative investor with moderate risk tolerance.
          - 41-60%: Balanced investor, comfortable with both risk and stability.
          - 61-80%: Growth-oriented investor, willing to take on higher risks for higher returns.
          - 81-100%: Aggressive or speculative investor, seeks maximum returns and is comfortable with high volatility.
          
        Use this information to generate a scorePercentage and think using a detailed interpretation of the investor's risk profile but return only a number (from 0% to 100%) don't respond with text just a single raw number.
      `
    }),
  });
    const data = await response.json();
    console.log(data);
    return data;
  }
  const currentStepIndex = step
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Investment Profile Assessment</CardTitle>
          <CardDescription>Please answer the following questions to determine your investment profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <Progress value={progress} className="w-full" />
          </div>
          <div className="flex justify-between mb-6">
            {steps.map((s, index) => (
              <div key={s.id} className="flex flex-col items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-white mb-2",
                  index <= currentStepIndex ? "bg-primary" : "bg-gray-300"
                )}>
                  {index < currentStepIndex ? <CheckCircle2 className="w-6 h-6" /> : <s.icon className="w-6 h-6" />}
                </div>
                <span className={cn(
                  "text-sm",
                  index <= currentStepIndex ? "text-primary font-medium" : "text-gray-500"
                )}>{s.title}</span>
              </div>
            ))}
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {questions.slice(step * 5, (step + 1) * 5).map((q) => (
                <FormField
                  key={q.id}
                  control={form.control}
                  name={q.id}
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{q.question}</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {q.options.map((option) => (
                            <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={option.value} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          ))}

                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            type={step === steps.length - 1 ? 'submit' : 'button'}
            onClick={() => {
              if (step < steps.length - 1) {
                form.handleSubmit((data) => {
                  setAnswers({ ...answers, ...data })
                  setStep(step + 1)
                })()
              } else {
                form.handleSubmit(onSubmit)()
              }
            }}
          >
            {step === steps.length - 1 ? 'Submit' : 'Next'}
            {step < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}