import { noticeData } from "../constants";
const Notice = () => {
  return (
    <section className="shadow-lg px-2 py-2 md:py-8 rounded-lg mt-8 border">
      <div className="container mx-auto px-4 md:px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Latest News & Notices
          </h2>
        </div>
        <div className="grid gap-6">
          {noticeData.map((item) => (
            <div key={item.id} className="rounded-md bg-white p-4 shadow-lg ">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
                <span className="text-sm text-gray-500">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Notice;
