'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, ChevronRight, ChevronLeft, User, Briefcase, Shield, Upload } from 'lucide-react'

type FormData = {
  fullName: string
  dateOfBirth: string
  profilePicture: FileList
  nationality: string
  currentPosition: string
  companyName: string
  yearsOfExperience: string
  previousRoles: string
  educationBackground: string
  certifications: string
  investmentPhilosophy: string
  riskManagementApproach: string
  trackRecord: string
}

const steps = [
  { id: 'personalInfo', title: 'Personal Information', icon: User },
  { id: 'professionalExp', title: 'Professional Experience', icon: Briefcase },
  { id: 'investmentApproach', title: 'Investment Approach', icon: Shield },
]

const questions: Array<{ id: keyof FormData; question: string; type: string; step: number; required?: boolean }> = [
  { id: 'fullName', question: 'Full Name', type: 'text', step: 0, required: true },
  { id: 'dateOfBirth', question: 'Date of Birth', type: 'date', step: 0, required: true },
  { id: 'profilePicture', question: 'Profile Picture', type: 'file', step: 0 },
  { id: 'nationality', question: 'Nationality', type: 'text', step: 0 },
  { id: 'currentPosition', question: 'Current Position', type: 'text', step: 1 },
  { id: 'companyName', question: 'Company Name', type: 'text', step: 1 },
  { id: 'yearsOfExperience', question: 'Years of Experience', type: 'number', step: 1 },
  { id: 'previousRoles', question: 'Previous Roles', type: 'textarea', step: 1 },
  { id: 'educationBackground', question: 'Educational Background', type: 'textarea', step: 1 },
  { id: 'certifications', question: 'Relevant Certifications', type: 'textarea', step: 1 },
  { id: 'investmentPhilosophy', question: 'Investment Philosophy', type: 'textarea', step: 2 },
  { id: 'riskManagementApproach', question: 'Risk Management Approach', type: 'textarea', step: 2 },
  { id: 'trackRecord', question: 'Track Record', type: 'textarea', step: 2 },
]

export default function ManagerProfileForm() {
  const [step, setStep] = useState(0)
  const router = useRouter()

  const form = useForm<FormData>({
    defaultValues: questions.reduce((acc, q) => ({ ...acc, [q.id]: '' }), {} as FormData),
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Form Data:', data)
    // Submit data to backend
  }

  const currentStepIndex = step
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Manager Profile</CardTitle>
          <CardDescription>Please provide information about your experience and approach</CardDescription>
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
              {questions.filter(q => q.step === step).map((q) => (
                <FormField
                  key={q.id}
                  control={form.control}
                  name={q.id}
                  rules={{ required: q.required ? 'This field is required' : false }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{q.question}</FormLabel>
                      <FormControl>
                        {q.type === 'textarea' ? (
                          <Textarea {...field} value={field.value as string} />
                        ) : q.type === 'file' ? (
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => field.onChange(e.target.files)}
                          />
                        ) : (
                          <Input
                            {...field}
                            type={q.type}
                            value={q.type === 'file' ? undefined : field.value as string}
                          />
                        )}
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
            onClick={() => step === 0 ? router.push('/profile/complete-profile') : setStep(step - 1)}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {step === 0 ? 'Back to Profile Selection' : 'Previous'}
          </Button>
          <Button
            type={step === steps.length - 1 ? 'submit' : 'button'}
            onClick={() => {
              if (step < steps.length - 1) {
                form.handleSubmit((data) => {
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