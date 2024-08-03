import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

interface User {
  userName: string;
  score: number;
}

interface CarouselItem {
  images: string[];
  answer: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User = { userName: '', score: 0 };
  carousels: CarouselItem[] = [
    { images: ['assets/guns.jpg', 'assets/kashmir.jpg', 'assets/mall.jpg'], answer: 'answer1' },
    { images: ['assets/guns.jpg', 'assets/kashmir.jpg', 'assets/mall.jpg'], answer: 'answer1' }
  ];
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    infinite: false,
    speed: 300
  };
  currentCarouselIndex: number = 0;
  userAnswer: string = '';
  userEmail: string = '';

  constructor(
    private readonly toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.sharedVariable$.subscribe( (email:string) => { 
      this.userEmail = email;
      if(this.userEmail!=='') {
      this.fetchScoreboardData(this.userEmail);
      }
     });
  }

  fetchScoreboardData(email: string): void {
    this.userService.getScoreboardByEmail(email).subscribe(
      (data: any) => {
        this.user.userName = data.username;
        this.user.score = data.score;
        this.currentCarouselIndex = data.score;

      },
      (error: any) => {
        console.error('Error fetching scoreboard data:', error);
        // Handle error as needed
      }
    );
  }
      
  checkAnswer(): void {
    if (this.userAnswer === this.carousels[this.currentCarouselIndex].answer) {
        this.currentCarouselIndex++;
        this.userAnswer = '';
        this.user.score+=1;
        this.userService.saveScore(this.userEmail,this.user.score).subscribe((data: any)=>{

        });
        this.toastr.success('Correct Answer!', 'Success');
    } else {
      this.toastr.error('Incorrect answer. Please try again.');
      this.userAnswer = '';
    }
  }
}
