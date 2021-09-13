import Prismic from "@prismicio/client";
import Client from "./prismic";

/**
 * Retrieves document by given ID.
 * @param {string} docID Document ID
 * @returns Document data queried by ID.
 */
export async function getDocById(docID) {
  const response = await Client.query(
    Prismic.Predicates.at("document.id", docID)
  );

  return response;
}

/**
 * Retrieves documents by given year based on first or last publication date.
 * @param {string|number} year Publication Year
 * @param {string} publicationType Publication Type ( first | last )
 * @returns Document array
 */
export async function getDocsByYear(year, publicationType) {
  const dateType =
    publicationType === "first"
      ? "first_publication_date"
      : "last_publication_date";

  const response = await Client.query(
    Prismic.Predicates.year(`document.${dateType}`, year)
  );

  return response;
}

/**
 * Retrieves all documents based on type name.
 * @param {string} typeName Type Name
 * @returns All documents at type.
 */
export async function getAllDocsByType(typeName) {
  const response = await Client.query(
    Prismic.Predicates.at("document.type", typeName)
  );

  return response;
}

/**
 * Retrieves paginated documents based on type name.
 * @param {string} typeName Type Name
 * @param {number} pageSize Page Size
 * @param {number} page Page Index
 * @returns All documents in page at type.
 */
export async function getAllDocsByTypePaginated(typeName, pageSize, page) {
  const response = await Client.query(
    Prismic.Predicates.at("document.type", typeName),
    { pageSize, page, orderings: `[my.${typeName}.date desc]` }
  );

  return response;
}

/**
 * Retrieves all documents by tags.
 * @param {Array<string>} tags Tag Array
 * @returns All documents by given tags.
 */
export async function getAllDocsByTags(tags) {
  const response = await Client.query(
    Prismic.Predicates.at("document.tags", tags)
  );

  return response;
}

/**
 * Search documents by text.
 * @param {string} keyword Search Keyword
 * @returns All documents consist of search keyword.
 */
export async function searchDoc(keyword) {
  const response = await Client.query(
    Prismic.Predicates.fulltext("document", keyword)
  );

  return response;
}

/**
 * Filter documents by field:value pairs.
 * @param {string} typeName Document Type ( Eg. product )
 * @param {string} fieldName Document Field Name ( Eg. price )
 * @param {string | number} fieldValue Document Field Value ( Eg. 100 )
 * @returns Filtered documents.
 */
export async function getFilteredDocs(typeName, fieldName, fieldValue) {
  const response = await Client.query(
    Prismic.Predicates.at(`my.${typeName}.${fieldName}`, fieldValue)
  );

  return response;
}
