import InputLabel from "../../../components/shared/InputLabel";
import Input from "../../../components/shared/Input";
import TextArea from "../../../components/shared/TextArea";
import Select from "../../../components/shared/Select";

export default function BookDetailsStep({errors, addBookInfo, handleChange, validateInput}: any) {
  console.log('editInfo', addBookInfo)
  return (
    <div>
      <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
        <InputLabel label="Book Title" required />
        <Input
          type="text"
          name="title"
          placeholder="Book Title"
          className="rounded-md"
            error={errors.title}
            showErrorMessage={!!errors.title}
          value={addBookInfo.firstName}
            onChange={handleChange}
            onBlur={validateInput}
        />
      </div>
      <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
        <InputLabel label="Author Name" />
        <Input
          type="text"
          name="author"
          placeholder="Author Name"
          className="rounded-md"
          value={addBookInfo.firstName}
            onChange={handleChange}
            onBlur={validateInput}
            error={errors.author}
            showErrorMessage={!!errors.author}
        />
      </div>
      <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
        <InputLabel label="Short Description" required />
        <TextArea
          name="description"
          placeholder="Write here..."
          value={addBookInfo.aboutMe}
            onBlur={validateInput}
            onChange={handleChange}
            error={errors.description}
            showErrorMessage={!!errors.description}
          className="rounded-md h-[83px]"
        />
      </div>
      <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
        <InputLabel label="Book Language" required />
        <Select
          //   onChange={handleChange}
          //   onBlur={validateInput}
          name="language"
          // value={addBookInfo.language}
          options={[]}
          className="bg-white"
          //   error={errors.language}
          //   showErrorMessage={!!errors.language}
        />
      </div>
      <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
        <InputLabel label="Book Condition" />
        <Select
          //   onChange={handleChange}
          //   onBlur={validateInput}
          name="condition"
          options={[]}
          className="bg-white"
          //   error={errors.condition}
          //   showErrorMessage={!!errors.condition}
          //   value={addBookInfo.condition}
        />
      </div>
    </div>
  );
}
