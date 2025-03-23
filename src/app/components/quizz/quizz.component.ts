import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import quizzQuestions from '../../../assets/data/quizzQuestions.json'
import { RouterTestingHarness } from '@angular/router/testing';

@Component({
   selector: 'app-quizz',
   imports: [CommonModule],
   templateUrl: './quizz.component.html',
   styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {
   buttonChoice(value: String) {
      this.answers.push(value)
      this.nextStep()
   }

   async nextStep() {
      this.questionIndex += 1

      if (this.questionMaxIndex > this.questionIndex) {
         this.questionSelected = this.questions[this.questionIndex]
      } else {
         const finalAnswer:String = await this.checkResults(this.answers)
         this.finished = true
         this.answerSelected = quizzQuestions.results[finalAnswer as keyof typeof quizzQuestions.results]
      }
   }

   async checkResults(answers: String[]) {
      const result = answers.reduce((previuos, current, i, arr) => {
         if (
            arr.filter(item => item === previuos).length >
            arr.filter(item => item === current).length) {
               return previuos
         } else {
            return current
         }
      })
      return result
   }


   title: String = ""

   questions: any
   questionSelected: any

   answers: String[] = []
   answerSelected: string = ""

   questionIndex: number = 0
   questionMaxIndex: number = 0

   finished: boolean = true

   constructor() {

   }

   ngOnInit(): void {
      if (quizzQuestions) {
         this.finished = false
         this.title = quizzQuestions.title

         this.questions = quizzQuestions.questions
         this.questionSelected = this.questions[this.questionIndex]
         this.questionMaxIndex = quizzQuestions.questions.length
      }
   }
}
