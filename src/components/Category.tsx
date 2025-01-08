import veg from '../assets/veg.png';
import bread from '../assets/bread.png';
import chips from '../assets/chips.png';
import Choco from '../assets/choco.png';
import pet from '../assets/pet.png';
import meat from '../assets/meat.png'
import clean from '../assets/cleaning.png';

export default function Category() {
  return (
    <>
      <div className="container px-4 py-10 ">
        <div className="flex flex-wrap items-center justify-center gap-14">
          <div className="flex flex-col items-center gap-2">
            <img
              src={veg}
              className="hover:scale-110 bg-blue-50 rounded-md"
              width={150}
              height={50}
              alt="Fruits"
            />
            <p className="text-center text-lg font-semibold">Fruits</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <img
              src={bread}
              className="hover:scale-110 bg-blue-50 rounded-md"
              width={100}
              height={50}
              alt="Breads"
            />
            <p className="text-center text-lg font-semibold">Breads</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <img
              src={chips}
              className="hover:scale-110 bg-blue-50 rounded-md"
              width={100}
              height={50}
              alt="Snacks"
            />
            <p className="text-center text-lg font-semibold">Snacks</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <img
              src={Choco}
              className="hover:scale-110 bg-blue-50 rounded-md"
              width={100}
              height={50}
              alt="Sweet Tooth"
            />
            <p className="text-center text-lg font-semibold">Sweet Tooth</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <img
              src={pet}
              className="hover:scale-110 bg-blue-50 rounded-md"
              width={100}
              height={50}
              alt="Pet Care"
            />
            <p className="text-center text-lg font-semibold">Pet Care</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <img
              src={meat}
              className="hover:scale-110 bg-blue-50 rounded-md"
              width={100}
              height={50}
              alt="meat"
            />
            <p className="text-center text-lg font-semibold">Meat</p>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <img
              src={clean}
              className="hover:scale-110 bg-blue-50 rounded-md"
              width={100}
              height={50}
              alt="cleaning"
            />
            <p className="text-center text-lg font-semibold">Cleaning</p>
          </div>

        </div>
      </div>
    </>
  );
}
