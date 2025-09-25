# Mini OS Backend Notes

## 1. TypeScript Basics

- TypeScript adds **static typing** to JavaScript, which helps catch errors during development before running the code.
- Variables, function parameters, and function returns can all be typed.
- Union types allow a variable to hold multiple possible types.
- Interfaces are used to define the **shape of an object**, similar to structs in C++.
- TypeScript types help ensure functions are called with correct data and help IDEs give better autocomplete suggestions.

---

## 2. Mongoose Models and Documents

- A **schema** defines the structure and rules for documents in a MongoDB collection.
- A **model** is a constructor compiled from the schema. It is like a class in C++ that allows creating, reading, updating, and deleting documents.
- A **document** is an instance of a model, similar to an object created from a class.
- Models and documents provide an abstraction layer over the database, making CRUD operations easier to manage.

---

## 3. Handling IDs

- MongoDB automatically assigns each document a unique `_id` of type ObjectId.
- TypeScript can explicitly type `_id` in interfaces to help with type checking.
- Functions that manipulate documents often require `_id` values. Union types (`string | ObjectId`) are useful because sometimes IDs come as strings and sometimes as ObjectIds.
- Casting can be used when TypeScript cannot infer the correct type.

---

## 4. Async Functions and Promises

- `async` functions are functions that perform asynchronous operations and always return a **Promise**, even if they don't return a value explicitly.
- `await` is used inside async functions to pause execution until a Promise resolves.
- Returning a Promise allows the caller to wait for an operation to complete before proceeding, similar to `std::future` in C++.
- Without `async`/`await` or Promises, asynchronous operations would not complete in order, causing potential bugs, especially with recursive operations.

---

## 5. Recursive Operations

- Recursive functions are often used to traverse hierarchical data, such as folder trees.
- Recursive deletion of folders works by first finding all children of a folder, recursively deleting each child, and finally deleting the folder itself.
- Using `await` in recursive functions ensures that all child deletions complete before the parent is deleted.
- This pattern ensures data integrity and avoids leaving orphaned documents in the database.

---

## 6. Key Takeaways

- TypeScript provides **compile-time safety**, making it easier to reason about data and function behavior.
- Mongoose models and documents act like **classes and objects** in C++, providing structure over raw database operations.
- Always handle IDs carefully, using the appropriate type and casting when necessary.
- Async programming requires understanding Promises and `await` to maintain correct execution order.
- Recursive operations with async need careful handling to avoid race conditions and ensure all steps complete in order.

---

## 7. C++ Analogies

- **TypeScript variable types** = C++ variable types (number → int/float, string → std::string)
- **Interface** = C++ struct
- **Model** = C++ class
- **Document** = C++ object
- **Promise<void>** = `std::future<void>` (represents a result that will be available later)
- **await** = `future.get()` (wait for asynchronous operation to complete)

---

**Tips for Working with the Mini OS Backend**

- Think of TypeScript as **C++ with runtime flexibility**.
- Treat Mongoose models like classes that manage database objects.
- Be deliberate with async functions and recursive operations — always ensure proper ordering with `await`.
- Document shapes and types help prevent subtle bugs, especially when working with hierarchical structures like folders and files.
