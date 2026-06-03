import FoodCard from "./FoodCard";

export default function FoodList({
  foods,
}: {
  foods: any[];
}) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {foods.map((food) => (
        <FoodCard
          key={food.item_id}
          food={food}
        />
      ))}
    </div>
  );
}