/* eslint-disable import/no-anonymous-default-export */
import moment from "moment";
import FileDownload from "js-file-download";

export default ({ file, name, fileFormat = "xlsx" }) => {
	const date = moment().format("YYYY-MM-DD");
	FileDownload(file, `${name}-${date}.${fileFormat.toLocaleLowerCase()}`);
};
