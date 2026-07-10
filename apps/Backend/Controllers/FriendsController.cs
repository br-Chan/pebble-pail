using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController : ControllerBase
    {
        private readonly FriendContext _context;

        public FriendsController(FriendContext context)
        {
            _context = context;
        }

        // GET: api/Friends
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Friend>>> GetFriends()
        {
            return await _context.Friends.ToListAsync();
        }

        // GET: api/Friends/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Friend>> GetFriend(long id)
        {
            var friend = await _context.Friends.FindAsync(id);

            if (friend == null)
            {
                return NotFound();
            }

            return friend;
        }

        // PUT: api/Friends/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFriend(long id, [FromBody] UpdateFriendRequest request)
        {
            var friend = await _context.Friends.FindAsync(id);
            if (friend == null)
            {
                return NotFound();
            }

            _context.Entry(friend).CurrentValues.SetValues(request);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FriendExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Friends
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Friend>> PostFriend([FromBody] CreateFriendRequest request)
        {
            var friend = new Friend { Name = request.Name };
            _context.Friends.Add(friend);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFriend), new { id = friend.Id }, friend);
        }

        // DELETE: api/Friends/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFriend(long id)
        {
            var friend = await _context.Friends.FindAsync(id);
            if (friend == null)
            {
                return NotFound();
            }

            _context.Friends.Remove(friend);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FriendExists(long id)
        {
            return _context.Friends.Any(e => e.Id == id);
        }
    }
}
