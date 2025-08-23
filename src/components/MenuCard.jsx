function MenuCard({
  image,
  title,
  description,
  category,
  categoryColor = "bg-red-600",
}) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div
          className={`absolute bottom-0 left-0 ${categoryColor} text-white px-3 py-1 text-sm font-semibold`}
        >
          {category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default MenuCard;
