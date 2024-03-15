import EditIcon from "/icons/edit.svg";
import TrashGrayIcon from "/icons/trash-gray.svg";
import moment from "moment";

export const ProductsDataExample = [
  {
    image:
      "https://image.api.playstation.com/vulcan/ap/rnd/202312/0117/315718bce7eed62e3cf3fb02d61b81ff1782d6b6cf850fa4.png",
    name: "The Last of Us Part II",
    category: ["PS4", "PS5"],
    genres: ["Action", "Adventure"],
    availability: "წინასწარი",
    priceV1: "$59.99",
    profitV1: "$10.00",
    priceV2: "$49.99",
    profitV2: "$8.00",
    discount: "-$10.00",
    subtitles: ["English", "Spanish"],
    description:
      "A gripping story of survival in a post-apocalyptic world.",
    voiceover: ["English"],
    views: 1000000,
    tags: ["Single Player", "Zombies", "Drama"],
    date: moment("2/27/2024 12:00", "M/D/YYYY HH:mm"),
    quantity: 500,
    sales: 250,
    ID: "#TLU2",
  },
  {
    image:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aa454069-1f38-4db1-a9e3-75d6b00c42e8/dfkt0my-35deb0ad-95b2-416f-a9c9-639c4f7116ea.jpg/v1/fill/w_1280,h_1600,q_75,strp/god_of_war_ragnarok_kratos_poster_by_akithefull_dfkt0my-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTYwMCIsInBhdGgiOiJcL2ZcL2FhNDU0MDY5LTFmMzgtNGRiMS1hOWUzLTc1ZDZiMDBjNDJlOFwvZGZrdDBteS0zNWRlYjBhZC05NWIyLTQxNmYtYTljOS02MzljNGY3MTE2ZWEuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.ujhCkkkWhdaXuVXTz24UDem8fMUSDSEcsPsTKZyx9H4",
    name: "God of War",
    category: ["PS5"],
    genres: ["Action", "Adventure"],
    availability: "ახლავე",
    priceV1: "$49.99",
    profitV1: "$8.00",
    priceV2: "$39.99",
    profitV2: "$6.00",
    discount: "-$10.00",
    subtitles: ["English", "Spanish"],
    description:
      "Join Kratos on a quest to slay the gods of Norse mythology.",
    voiceover: ["English", "Spanish", "Chinise", "Russian"],
    views: 1500000,
    tags: ["Single Player", "Mythology", "Hack and Slash"],
    date: moment("2/27/2024 12:00", "M/D/YYYY HH:mm"),
    quantity: 800,
    sales: 400,
    ID: "#GOW",
  },
  {
    image:
      "https://cdn.marvel.com/content/1x/marvsmposterbk_intdesign.jpg",
    name: "Marvel's Spider-Man",
    category: ["PS4"],
    genres: ["Action", "Adventure"],
    availability: "ახლავე",
    priceV1: "$49.99",
    profitV1: "$8.00",
    priceV2: "$39.99",
    profitV2: "$6.00",
    discount: "-$10.00",
    subtitles: ["English", "Spanish"],
    description:
      "Swing through New York City as the iconic Spider-Man.",
    voiceover: ["English"],
    views: 2000000,
    tags: ["Single Player", "Superhero", "Open World"],
    date: moment("2/27/2024 12:00", "M/D/YYYY HH:mm"),
    quantity: 1000,
    sales: 500,
    ID: "#SpiderMan",
  },
  {
    image:
      "https://cdn.europosters.eu/image/750/posters/horizon-zero-dawn-key-art-i34856.jpg",
    name: "Horizon Zero Dawn",
    category: ["PS4"],
    genres: ["Action", "Adventure", "RPG"],
    availability: "წინასწარი",
    priceV1: "$49.99",
    profitV1: "$8.00",
    priceV2: "$39.99",
    profitV2: "$6.00",
    discount: "-$10.00",
    subtitles: ["English", "Spanish"],
    description:
      "Unravel the mysteries of a post-apocalyptic world dominated by robots.",
    voiceover: ["English"],
    views: 1200000,
    tags: ["Single Player", "Robots", "Exploration"],
    date: moment("2/27/2024 12:00", "M/D/YYYY HH:mm"),
    quantity: 600,
    sales: 300,
    ID: "#HZD",
  },
];

export const allColumnNames = [
  { id: "1", key: "image", isChecked: true, title: "სურათი" },
  { id: "2", key: "name", isChecked: true, title: "სახელი" },
  { id: "3", key: "category", isChecked: true, title: "კატეგორია" },
  {
    id: "4",
    key: "availability",
    isChecked: true,
    title: "ხელმისაწვდომობა",
  },
  { id: "5", key: "priceV1", isChecked: true, title: "ფასი (v1)" },
  {
    id: "6",
    key: "profitV1",
    isChecked: true,
    title: "ფასნადები (v1)",
  },
  { id: "7", key: "priceV2", isChecked: true, title: "ფასი (v2)" },
  {
    id: "8",
    key: "profitV2",
    isChecked: true,
    title: "ფასნადები (v2)",
  },
  { id: "9", key: "discount", isChecked: true, title: "ფასდაკლება" },
  {
    id: "10",
    key: "subtitles",
    isChecked: true,
    title: "სუბტიტრები",
  },
  { id: "11", key: "description", isChecked: true, title: "აღწერა" },
  {
    id: "12",
    key: "voiceover",
    isChecked: true,
    title: "გახმოვანება",
  },
  { id: "13", key: "views", isChecked: true, title: "ნახვები" },
  { id: "14", key: "tags", isChecked: true, title: "თეგები" },
  { id: "15", key: "date", isChecked: true, title: "თარიღი" },
  { id: "16", key: "quantity", isChecked: true, title: "რაოდენობა" },
  { id: "17", key: "sales", isChecked: true, title: "გაყიდვები" },
  { id: "18", key: "ID", isChecked: true, title: "ID" },
  { id: "19", key: "tools", isChecked: true, title: "ხელსაწყოები" },
];

export const generateDataSource = (data) => {
  return data.map((product) => ({
    image: (
      <div className="game-image">
        <img src={product.image} alt={product.name} />
      </div>
    ),
    name: <span className="game-name width-140">{product.name}</span>,
    category: (
      <div className="categories">
        {product.category.map((category, indx) => (
          <span
            key={category + indx}
            className={
              (category === "PS5" && "PS5") ||
              (category === "PS4" && "PS4") ||
              ""
            }
          >
            {category}
          </span>
        ))}
      </div>
    ),
    availability: (
      <span className="availability">{product.availability}</span>
    ),
    priceV1: <span className="price">{product.priceV1}</span>,
    profitV1: <span className="profit">{product.profitV1}</span>,
    priceV2: <span className="price">{product.priceV2}</span>,
    profitV2: <span className="profit">{product.profitV2}</span>,
    discount: <span className="discount">{product.discount}</span>,
    subtitles: (
      <span className="small-text width-140">
        {product.subtitles.join(", ")}
      </span>
    ),
    description: (
      <div className="small-text width-140">
        {product.description}
      </div>
    ),
    voiceover: (
      <span className="small-text width-140">
        {product.voiceover.join(", ")}
      </span>
    ),
    views: <span className="medium-text">{product.views}</span>,
    tags: (
      <div className="tags">
        {product.tags.map((tag, index) => (
          <span key={tag + index} className="tag">
            #{tag}
          </span>
        ))}
      </div>
    ),
    date: (
      <span className="medium-text width-100">
        {product.date?.format("M/D/YYYY HH:mm")}
      </span>
    ),
    quantity: <span className="medium-text">{product.quantity}</span>,
    sales: (
      <span className="medium-text width-100">{product.sales}</span>
    ),

    ID: <span className="big-text width-100">{product.ID}</span>,
    tools: (
      <div className="table-tools">
        <button className="table-btn-edit">
          <img src={EditIcon} alt="edit" className="edit-icon" />
          რედაქტირება
        </button>
        <button className="table-btn-delete">
          <img
            src={TrashGrayIcon}
            alt="delete"
            className="trash-icon"
          />
          წაშლა
        </button>
      </div>
    ),
  }));
};

export const generateColumns = (
  allColumnNames,
  sortTableDataByKey
) => {
  const columns = allColumnNames
    .filter((item) => item.isChecked)
    .map(({ key, title }) => {
      let columnTitle;

      switch (key) {
        case "name":
        case "category":
        case "availability":
        case "priceV1":
        case "priceV2":
        case "profitV1":
        case "profitV2":
        case "discount":
        case "views":
        case "quantity":
        case "sales":
        case "date":
        case "ID":
          columnTitle = (
            <div
              className="col-title"
              onClick={() => sortTableDataByKey(key)}
            >
              <span className="col-title-name">{title}</span>
              <img
                className="col-title-icon"
                src="/icons/sort-arrows.svg"
                alt="sort"
              />
            </div>
          );
          break;
        default:
          columnTitle = title;
      }

      return {
        key,
        title: columnTitle,
        dataIndex: key,
      };
    });

  return columns;
};
