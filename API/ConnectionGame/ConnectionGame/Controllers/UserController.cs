using ConnectionGame.Data;
using ConnectionGame.Dto;
using ConnectionGame.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using System.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace ConnectionGame.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserContext _context;

        public UsersController(UserContext context)
        {
            _context = context;
        }

        
        [HttpPost("register")]
       
        public async Task<ActionResult<bool>> RegisterUser(UserDto user)
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);

            User userValue = new User
            {
                Username = user.Username,
                Email = user.Email,
                Password = passwordHash,
            };
            _context.Users.Add(userValue);
            await _context.SaveChangesAsync();

            return true;
        }

        [HttpPost("registerScorer")]
        public async Task<ActionResult<bool>> RegisterScorer(UserDto user)
        {

            Scoreboard userValue = new Scoreboard
            {
                Username = user.Username,
                Email = user.Email
            };
            _context.Scoreboard.Add(userValue);
            await _context.SaveChangesAsync();

            return true;
        }


        [HttpGet("checkEmail")]
        public async Task<ActionResult<bool>> CheckEmail(string email)
        {
            var Email= await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (Email!=null)
            {
                return true;
            }

            return false;
        }

        [HttpPost("checkEmailPassword")]
        public async Task<IActionResult> checkEmailPassword(Usercheck user)
        {
            var userfromDb = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            // Store email in claims or database as needed
            var claims = new[]
            {
            new Claim(ClaimTypes.Email, user.Email),
            // Add other claims as needed
        };


            // Check if user exists and verify password
            if (userfromDb == null || !BCrypt.Net.BCrypt.Verify(user.Password, userfromDb.Password))
            {
                return Unauthorized(); // Authentication failed
            }

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superdooperSafetySecretKerdtfhyhey@456789"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "https://localhost:5001",
                audience: "https://localhost:5001",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return Ok(new AuthenticatedResponse { Token = tokenString });
        }

        [HttpGet("email")]
        [Authorize]
        public IActionResult GetEmail()
        {
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            if (email == null)
            {
                return Unauthorized();
            }
            return Ok(new { email });
        }



        [HttpGet("GetScoreboard")]
        [Authorize]
        public async Task<ActionResult<List<Scoreboard>>> GetScoreboard()
        {
            var scoreboard = await _context.Scoreboard.OrderByDescending(u => u.Score).ToListAsync();

            return Ok(scoreboard);
        }


       

        [HttpGet("scoreboardData")]
        [Authorize]
        public async Task<ActionResult<Scoreboard>> getDataUsingEmail(string email)
        {
            var data = await _context.Scoreboard.FirstOrDefaultAsync(u => u.Email == email);

            if (data != null)
            {
                return data;
            }
            return NoContent();
        }

        [HttpPost("saveScore")]
        [Authorize]
        public async Task<ActionResult<bool>> saveScore(UserScore data)
        {
            var user = await _context.Scoreboard.FirstOrDefaultAsync(u => u.Email == data.Email);
            if (user != null)
            {
                user.Score = data.Score;
                _context.Scoreboard.Update(user);
                await _context.SaveChangesAsync();
            }

            return true;

        }



    }
}
