import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  
  scoreboardData!: any[];

  constructor(private userService: UserService , private http: HttpClient) { }

  ngOnInit(): void {

    this.userService.getScoreboard().subscribe((data: any[]) => {
      this.scoreboardData = data; // Assuming data is an array of scoreboard entries
    });
  }
}
