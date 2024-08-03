import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LeaderboardEntry } from '../models/leaderboard-entry.model';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private leaderboard: LeaderboardEntry[] = [
    { userName: 'Alice', score: 150 },
    { userName: 'Bob', score: 120 },
    { userName: 'Charlie', score: 100 },
    // Add more entries as needed
  ];

  constructor() { }

  getLeaderboard(): Observable<LeaderboardEntry[]> {
    return of(this.leaderboard.sort((a, b) => b.score - a.score));
  }

}
