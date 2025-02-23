function Lesson({ lesson }) {
  return (
    <>
      <li
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "70%",
          padding: "15px 10px 15px 10px",
          borderBottom: "1px solid rgba(0, 0, 0, .13)",
          color: "#666",
        }}
      >
        <span>👉 {lesson.lesson_name}</span>
        <span>{lesson.duration} phút</span>
      </li>
      {lesson.excercises?.map((el) => (
        <div style={{ textIndent: "30px", marginTop: "5px" }} key={el._id}>
          👉 Ôn tập: {el.excercise_name}
        </div>
      ))}
    </>
  );
}

export default Lesson;
