import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {style} from "@angular/animations";

@Component({
    selector: 'app-rps-game',
    templateUrl: './rps-game.component.html',
    styleUrls: ['./rps-game.component.scss']
})
export class RpsGameComponent implements OnInit {

    @ViewChild('playerHand') playerHand!: ElementRef;
    @ViewChild('computerHand') computerHand!: ElementRef;
    @ViewChild('winner') winner!: ElementRef;
    @ViewChild('playerScore') playerScore!: ElementRef;
    @ViewChild('computerScore') computerScore!: ElementRef;

    selectPly!: string;
    pScore = 0;
    cScore = 0;

    constructor() {
    }

    ngOnInit(): void {
        const playBtn = document.querySelector('.intro button');
        const introScreen = document.querySelector('.intro');
        const match = document.querySelector('.match');

        playBtn?.addEventListener('click', () => {
            introScreen?.classList.add('unActive');
            match?.classList.remove('unActive');
            match?.classList.add('active');
        })
        this.playMatch();
    }
    numberOfClicks = 0;
    // @HostListener('click', ['$event.target']) onClick(btn: any) {
    //     console.log("button", btn, "number of clicks:", this.numberOfClicks++);
    //     // this.playerHand.nativeElement.style.animation = 'shakePlayer 2s ease';
    //     // debugger
    // }

    playMatch() {
        const options = document.querySelectorAll('.options button');
        const computerOptions = ['rock', 'paper', 'scissors'];
        const df = document.querySelector('.player-hand');


        options.forEach(option => {
            option.addEventListener('click', () => {
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[computerNumber];
                this.playerHand.nativeElement.src = `./assets/${this.selectPly}.png`;
                this.computerHand.nativeElement.src = `./assets/${computerChoice}.png`;
                this.playerHand.nativeElement.style.animation = 'shakePlayer 2s ease';
                this.Comparison(this.selectPly, computerChoice);
            })
        });

    }

    selectBtn(event: any) {
        this.selectPly = event.target.textContent;
    }

    Comparison(playerChoice: string, computerChoice: string): any {
        if (playerChoice === computerChoice) {
            this.winner.nativeElement.textContent = 'It is a Tie';
            return;
        }
        if (playerChoice === 'rock') {
            if (computerChoice === 'scissors') {
                this.winner.nativeElement.textContent = 'Player wins';
                this.pScore++;
                this.updateScore();
                return;
            } else {
                this.winner.nativeElement.textContent = 'computer wins';
                this.cScore++;
                this.updateScore();
            }
        }
        if (playerChoice === 'paper') {
            if (computerChoice === 'scissors') {
                this.winner.nativeElement.textContent = 'computer wins';
                this.cScore++;
                this.updateScore();
                return;
            } else {
                this.winner.nativeElement.textContent = 'Player wins';
                this.pScore++;
                this.updateScore();
            }
        }
        if (playerChoice === 'scissors') {
            if (computerChoice === 'rock') {
                this.winner.nativeElement.textContent = 'computer wins';
                this.cScore++;
                this.updateScore();
                return;
            } else {
                this.winner.nativeElement.textContent = 'Player wins';
                this.pScore++;
                this.updateScore();
            }
        }
    }
    updateScore(): void {
        this.playerScore.nativeElement.textContent = this.pScore;
        this.computerScore.nativeElement.textContent = this.cScore;
    }
}
