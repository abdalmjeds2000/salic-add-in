import axios from "axios";

export async function fetchITServiceRequests() {
  try {
    const response = await axios.get(
      "https://graph.microsoft.com/v1.0/sites/92458303-f642-487c-8328-6914b90ae9a2/lists/b2f93318-9149-4369-a74f-f3d2029f2ede/items?expand=fields(select=AttachmentFiles,*)"
      // "https://salic.sharepoint.com/_api/lists/getByTitle('Issue Types')/items?$select=AttachmentFiles,*&$expand=AttachmentFiles"
      // "https://graph.microsoft.com/v1.0/sites/7edaebd4-868c-4eda-9895-6bd7887cb5bc/lists/a4ef4d16-3983-4d9c-833d-a02479bbc1fa/items?expand=fields(select=AttachmentFiles,*)"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
