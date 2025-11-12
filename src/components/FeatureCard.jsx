const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
      {icon}
    </div>
    <h4 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default FeatureCard;