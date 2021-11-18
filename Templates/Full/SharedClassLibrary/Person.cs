
namespace TailBlazor.Core
{
    // public record Person( string Name, string Bio, string Image );
    public class Person
    {
        public Person( string name, string bio, string image )
        {
            Name = name;
            Bio = bio;
            Image = image;
        }

        public string Name { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }
    }
}