using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoastedCoffeeAccountingSystem.Models;

namespace RoastedCoffeeAccountingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoastingsController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public RoastingsController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Roastings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Roasting>>> GetRoastings()
        {
            return await _context.Roastings.Include(r => r.Coffee).ToListAsync();
        }

        // GET: api/Roastings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Roasting>> GetRoasting(int id)
        {
            var roasting = await _context.Roastings.FindAsync(id);

            if (roasting == null)
            {
                return NotFound();
            }

            return roasting;
        }

        // PUT: api/Roastings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoasting(int id, Roasting roasting)
        {
            if (id != roasting.Id)
            {
                return BadRequest();
            }

            _context.Entry(roasting).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoastingExists(id))
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

        // POST: api/Roastings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Roasting>> PostRoasting(RoastingDTO roastingDTO)
        {
            var roasting = DTOToRoasting(roastingDTO);
            _context.Roastings.Add(roasting);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRoastings), new { id = roasting.Id }, roasting);
        }

        // DELETE: api/Roastings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoasting(int id)
        {
            var roasting = await _context.Roastings.FindAsync(id);
            if (roasting == null)
            {
                return NotFound();
            }

            _context.Roastings.Remove(roasting);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private Roasting DTOToRoasting(RoastingDTO roastingDTO)
            => new Roasting
            {
                Amount = roastingDTO.Amount,
                CoffeeId = roastingDTO.CoffeeId,
                Coffee = _context.GreenCoffee.SingleOrDefault(c => c.Id == roastingDTO.CoffeeId)!
            };


        private bool RoastingExists(int id)
        {
            return _context.Roastings.Any(e => e.Id == id);
        }
    }
}
