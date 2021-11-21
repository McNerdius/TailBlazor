namespace SharedClassLibrary;

public class RandomPersonService : IPersonService
{
    // todo: .NET 6 has 3-param zip
    public Task<IEnumerable<Person>?> GetPeopleAsync( int count )
    {
        var people = names.RandomElements( count )
             .Zip( bios.RandomElements( count ), ( name, bio ) => (name, bio) )
             .Zip( emojis.RandomElements( count ), ( nameAndBio, pic ) => new Person( nameAndBio.name, nameAndBio.bio, pic ) );

        // why should it complain that this is IEnumerable<Person> if i remove type info
        return Task.FromResult<IEnumerable<Person>?>( people );
    }

    private static string[] emojis = new[]
    {
            "🤔","😭","😃","🤨","💙","🧠","😜","🥺","😘","👶","😃","🤣","😆","🥰","😎","😲","😇","🥳","🤡","🐱‍👤","🐱","🐱‍🏍","👀","🦾"
        };

    private static string[] names = new[]
    {   // https://www.randomlists.com/random-names?qty=50
            "Kadence Calhoun",
            "Kate Charles",
            "Alicia Duarte",
            "Jovany Schwartz",
            "Rafael Olson",
            "Carson Lowe",
            "Karissa Osborn",
            "Logan Perry",
            "Shayla Holder",
            "Remington Swanson",
            "Erik Berry",
            "Misael Jarvis",
            "Kailee Lee",
            "Franklin Smith",
            "Joselyn Phelps",
            "Tyshawn Patel",
            "Aditya Gentry",
            "Celeste Pierce",
            "Allisson Waller",
            "Rafael Ryan",
            "Violet Choi",
            "Callum Clayton",
            "Reese Arias",
            "Colby Pruitt",
            "Corbin Burton",
            "Dalia Hahn",
            "Yareli Christian",
            "Sara Houston",
            "Hudson Orozco",
            "Kenley Lee",
            "Kayleigh Herman",
            "Alessandro Frederick",
            "Carleigh Kramer",
            "Cierra Barrett",
            "Janae Baker",
            "Hector Shea",
            "Arthur Flores",
            "Bronson Small",
            "Laylah Roberts",
            "Reyna Scott",
            "Ashlynn Norris",
            "Conrad Clark",
            "Humberto Cook",
            "Deanna Boyd",
            "Johnathon Wall",
            "Johan Floyd",
            "Dante George",
            "Ramiro Torres",
            "Ulises Harris",
            "Moshe Christian"
        };

    private static string[] bios = new[]
    {   // http://mcipsum.azurewebsites.net/ipsum/hipster,veggie,bacon,fruit,genres,jabberwocky,latin?p=50&l=false
            "Hast thou slain tulgey wood, gimble claws catch joy beware vorpal blade.  Mimsy chortled frumious foe snicker-snack, tumtum raths whiffling.  Slithy bandersnatch shun toves tumtum left it dead.  Through frumious with eyes of flame borogoves jabberwock.",
            "Heavy metal mystery techno metal grindcore electropop dubstep rap.  Nintendocore folk thriller rap dance drama.  Black metal folk claymation grunge live-action, soft rock thriller fiction.  Zombie wonky romance stop-motion grindcore comedy dubstep.",
            "Frumious shun borogoves bandersnatch whiffling joy snicker-snack.  Chortled slithy gyre went galumphing back hand.  Left it dead long time o frabjous day tree frumious hand burbled.  Mimsy slithy mome manxome chortled.  Gimble toves tree brillig joy beware jabberwock.",
            "Rhoncus etiam volutpat pulvinar netus aute.  Vivamus habitasse ac sint diam, eget ligula ante.  Turpis lacinia tellus diam montes.  Exercitation blandit enim eget curabitur ullamcorper eu.",
            "Wakame mustard cardoon turmeric laver.  Garland chrysanthemum brussels sprouts ensete sweet potato.  Greater plantain brooklime water spinach garlic.  Lemongrass paracress tigernut potato samphire sierra leone bologi shallot.",
            "Hamburger salami short ribs pork belly.  Ribeye tenderloin alcatra salami short loin prosciutto.  Spare ribs biltong meatloaf ball tip ribeye frankfurter pork belly.",
            "Pea collard greens grape leaves broccoli catsear wasabi.  Rutabaga sorrel fluted pumpkin florence fennel.  Broccoli radish turnip galangal wakame.",
            "Lacus veniam pharetra mollis egestas.  Sed tortor aenean hendrerit.  Porttitor laoreet ea anim ullamcorper.",
            "Action dance folk dubstep rock and roll pop rock nerdcore.  Reggae jazz claymation disco punk industrial metal.  Fiction rom-com jazz steampunk R&B screamo romance.  Satire soft rock rock reggae thriller.",
            "Tumtum wabe long time chortled with eyes of flame jubjub brillig.  Left it dead hand jabberwock beamish boy whiffling.  Chortled tulgey gyre one two one two jubjub toves joy foe.",
            "Surinam cherry apple ketupa rose apple tree tomato.  Guava velvet tamarind water apple wax melon rambutan cantaloupe genipap.  Kechapi casaba champedak charantais blueberry.  Sweet granadilla cranberry mammey sapote ogen melon loganberry persimmon sweet melon.  Santoli durian monkey bread green pepper guava.",
            "Grunge rom-com rap pop fiction.  Jazz documentary fantasy black metal folk death metal.  Death metal punk nintendocore folk.  Mockumentary blues sci-fi funk, zombie rom-com ska rap.",
            "Industrial metal pop rock romance black metal dubstep mystery.  Western comedy rock and roll satire grunge, disco screamo found footage.  Mystery opera funk comedy nintendocore.  Hip-hop punk screamo rock and roll death metal, soft rock opera rock.  Stop-motion fantasy blues psychobilly rom-com.",
            "Prosciutto meatball flank ham.  Salami tail kevin buffalo short ribs swine ham.  Shoulder pancetta fatback ham landjaeger biltong drumstick filet mignon.  Pork chop boudin corned beef shank spare ribs.",
            "Farm-to-table cloud letterpress humblebrag.  Offal gastropub 8-bit four dollar toast flexitarian.  Stumptown gastropub readymade single-origin coffee wayfarers celiac fingerstache typewriter.  Stumptown paleo offal photo booth food truck migas.  Flannel lumbersexual shaman selvage pug waistcoat viral salvia.",
            "Star nut palm avocado tomato wax melon kiwano mammey sapote loganberry crenshaw.  Mammey sapote christmas melon tangerine champedak mammey apple mango papaya.  Crenshaw orange hogplum malay apple.",
            "Melon-pear sweet melon custard apple tree tomato, kechapi raspberry strawberry akee.  Chalta jackfruit calabash, barberry grapefruit sala mammey apple tangelo.  Blackberry indian jujube golden apple lucuma mammey sapote sapodilla.  Minneola barberry sweetsop peach palm morinda net melon sweet granadilla olive.  Sweet melon malay apple clementine golden apple star apple.",
            "Long time manxome claws catch sought left it dead tumtum snicker-snack.  Jabberwock Callooh Callay left it dead tree so rested bird mimsy.  Bird jabberwock vorpal blade burbled, jaws bite o frabjous day tumtum left it dead.  Frumious long time mimsy toves left it dead Callooh Callay gimble.  Brillig vorpal mome hand hast thou slain, jaws bite beware manxome.",
            "Beamish boy toves snicker-snack slithy.  Toves sought tumtum vorpal.  Toves bird manxome beware tulgey burbled so rested.  Jubjub brillig frumious hand.  Jabberwock whiffling vorpal claws catch hast thou slain so rested wabe shun.",
            "Capicola short loin shoulder, pork chop alcatra ham hock corned beef kielbasa.  Pork chop burgdoggen kielbasa drumstick tri-tip tail.  Alcatra swine chuck corned beef beef ribs drumstick.  Swine chicken pastrami salami biltong turducken cow pancetta.",
            "Kiwano voavanga crenshaw malay apple currants, tomato alibertia green pepper.  Xigua galia loquat ugli crenshaw, loganberry apple malay apple.  Pummelo date rambai honeydew.  Persimmon nance indian jujube star apple.",
            "Currants cape gooseberry passion fruit, plum fig malay apple calabash golden apple.  Star apple sapodilla galia loganberry pear minneola.  Bignay quince ogen melon wax melon passion fruit custard apple.  Lime velvet tamarind monkey bread clementine musk melon.",
            "Dandelion shepherd's purse wild leek, malabar spinach stridolo chinese mallow carrot daikon.  Carrot pea brussels sprouts sorrel celeriac lamb's lettuce komatsuna pak choy.  Napa cabbage chinese mallow florence fennel golden samphire horseradish taro yam sweet potato.  Turnip tigernut chives wheatgrass, chaya chinese artichoke grape leaves lagos bologi.",
            "Nibh fames mus, aenean deserunt ad quis fermentum.  Voluptate reprehenderit esse deserunt est.  Non viverra varius congue molestie sodales nam.  Minim ut vel pretium hendrerit mus parturient porta.  Platea qui dis sint.",
            "Lychee santoli custard apple date sugar apple sala.  Honeydew durian chalta velvet tamarind ugli monkey bread akee.  Lychee alibertia guava ita palm strawberry.",
            "Pignut corn salad common purslane lagos bologi chives wakame.  Sea kale laver land cress tatsoi miner's lettuce stridolo fluted pumpkin.  Shepherd's purse yarrow carola wheatgrass.  Galangal kuka jerusalem artichoke turnip.  Rutabaga arugula garlic burdock komatsuna.",
            "Corned beef short ribs shoulder t-bone tail boudin.  Kielbasa tenderloin andouille, burgdoggen meatloaf filet mignon frankfurter tri-tip.  Pork chop capicola beef ham corned beef sausage chuck buffalo.  Jowl ground round drumstick ham hock strip steak, meatloaf jerky shank.",
            "Salvia whatever forage tumblr.  Ramps kale chips salvia direct trade iPhone shaman skateboard.  Cray artisan jean shorts portland deep v chicharrones organic scenester gastropub.",
            "Sought with eyes of flame one two one two sword left it dead.  Callooh Callay outgrabe with its head wood left it dead.  Gyre outgrabe hand sought hast thou slain jabberwock as uffish.  Callooh Callay foe gyre gimble snicker-snack.",
            "Blues metal pop dark comedy fiction romance.  Mockumentary britpop rock metal military opera k-pop.  Blues fantasy mockumentary R&B CGI.",
            "Chillwave shabby chic fanny pack tbh, tousled ennui slow-carb intelligentsia.  Fingerstache yuccie tumeric butcher.  Pickled fashion axe bicycle rights polaroid direct trade air plant banh mi.  DIY mlkshk pabst tumblr ramps scenester.  Chia copper mug semiotics four loko food truck whatever actually fixie.",
            "Plaid meggings keytar humblebrag VHS jean shorts.  Lyft green juice austin bushwick chicharrones.  Lumbersexual pok pok cloud messenger bag vape snackwave beard skateboard.",
            "Health affogato cornhole food truck keffiyeh godard.  Intelligentsia marfa tumblr retro occupy brunch craft beer.  Subway tile sriracha meggings tofu lyft.",
            "Chives stridolo pak choy rutabaga mozuku cabbage.  Elephant foot yam ulluco welsh onion hijiki lemongrass.  Malabar spinach turmeric dandelion mashua.",
            "Ground round strip steak tail, ham hamburger corned beef biltong bacon.  Frankfurter landjaeger pork chop meatball, pork belly ham hock cow cupim.  Beef sirloin turkey tri-tip prosciutto meatloaf ground round.  Pork loin ground round shankle short ribs, short loin chicken leberkas salami.  Pastrami ball tip rump pork turkey burgdoggen beef.",
            "With its head outgrabe with eyes of flame borogoves Callooh Callay mimsy jabberwock.  Brillig went galumphing back hast thou slain so rested manxome vorpal blade.  Wood sword tulgey went galumphing back borogoves.  Hast thou slain sword raths left it dead with its head chortled.  Claws catch jubjub o frabjous day one two one two burbled.",
            "Fam affogato ramps leggings selfies, hoodie neutra Palo Santo.  Chia bread fixie cliche.  Cliche jianbing iPhone stumptown gentrify thundercats.",
            "Wabe slithy chortled hast thou slain.  Bird shun with its head hand jubjub.  Joy tree burbled hand mome tulgey bandersnatch.",
            "Comedy mystery horror screamo found footage, reggae steampunk funk.  Pop k-pop fantasy romance rap punk.  Rock and roll space opera claymation death metal nu-metal techno arthouse.",
            "Varius turpis labore, libero non mattis et sem.  Porttitor exercitation aliquet elit.  Felis dictum ultricies sed, pariatur magna neque quam.",
            "Drinking vinegar edison bulb whatever normcore distillery readymade gentrify.  Paleo af chambray hot chicken pop-up, next level ethical gastropub.  Fam poutine pok pok fashion axe green juice ethical direct trade.",
            "Hamburger ground round burgdoggen tail tongue porchetta meatloaf ham hock.  Biltong meatloaf pork belly pork chop pork.  Boudin sausage picanha cow, biltong corned beef pastrami turducken.",
            "Frankfurter tri-tip capicola short loin kevin meatloaf.  Shank buffalo prosciutto biltong.  Jerky kevin bacon beef ribs leberkas.",
            "Persimmon jaboticaba biriba lychee.  Kepel cantaloupe olive honeydew sharlyn.  Cherry melon-pear moutain soursop green pepper.  Lucuma morinda sea grape kumquat sapodilla persian melon genipap.  Custard apple tomato banana crenshaw blackberry cape gooseberry moutain soursop pitahaya.",
            "Fiction CGI funk techno.  Nerdcore military pop rock and roll, stop-motion documentary psychobilly soft rock.  Grunge romance pop funk.",
            "Jabberwock frumious o frabjous day bird.  Borogoves jabberwock wood sought hand wabe long time.  Burbled beware outgrabe long time gyre as uffish.",
            "Borage greens napa cabbage chickweed water caltrop yarrow.  Lemongrass spinach lizard's tail mizuna greens yam.  Horseradish potato dandelion dill borage greens.  Potato onion brussels sprouts watercress nori, lizard's tail rapini new zealand spinach sierra leone bologi.  Common purslane greater plantain good king henry ensete skirret hamburg parsley napa cabbage.",
            "Mi consequat a tristique nisi aenean.  Commodo excepteur cursus officia.  Ut tempor cupidatat commodo euismod.  Aliqua luctus odio justo mus.  Laoreet parturient mi odio veniam metus adipisicing cillum.",
            "Nisl volutpat eros lobortis suscipit.  Odio proin qui in.  Veniam labore donec ipsum nulla.  Non nisl ea sunt.",
            "Tumeric church-key tilde biodiesel, swag offal 90's plaid.  Kombucha kickstarter health, portland tbh forage pitchfork migas.  Occupy kale chips leggings tilde pop-up ethical taiyaki.  Succulents shabby chic semiotics prism.  Selfies polaroid irony blog hella, pour-over PBR&B gentrify.",
        };
}
