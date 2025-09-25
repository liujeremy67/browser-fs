TypeScript Basics for Backend

- Type annotations help catch errors at compile time:

let name: string = "Jeremy";
let age: number = 25;
Use | to indicate multiple possible types:

ts
Copy code
let id: string | Types.ObjectId;
Interfaces describe object shapes (like C++ structs):

ts
Copy code
interface IUser {
  username: string;
  passwordHash: string;
}
2. Mongoose Models and Documents
Schema defines rules for MongoDB documents:

ts
Copy code
const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});
Model is like a class in C++: used to query/create documents:

ts
Copy code
const User = mongoose.model<IUser>("User", UserSchema);
Document is an instance of a model (like an object):

ts
Copy code
const newUser = new User({ username: "jeremy", passwordHash: "hash" });
await newUser.save();
3. Handling IDs
MongoDB documents have _id of type ObjectId.

In TypeScript, explicitly type _id in your interface:

ts
Copy code
_id: Types.ObjectId;
When passing _id to functions that expect string | Types.ObjectId, cast if needed:

ts
Copy code
deleteRecursive(child._id as Types.ObjectId, userId);
4. Async Functions and Promises
async functions always return a Promise, even if you don’t explicitly return a value:

ts
Copy code
async function deleteRecursive(...): Promise<void> { ... }
await pauses the function until a Promise resolves:

ts
Copy code
const children: IFile[] = await File.find({ parentId: fileId });
Promise<void> is like std::future<void> in C++: you wait for the async operation, even if it doesn’t return anything.

5. Recursive Operations Example (Deleting a Folder Tree)
Recursive deletion uses DFS pattern:

Find all child files/folders

Recursively delete each child

Delete the parent folder/file itself

ts
Copy code
export async function deleteRecursive(
  fileId: Types.ObjectId | string,
  userId: Types.ObjectId | string
): Promise<void> {
  const children: IFile[] = await File.find({ parentId: fileId, userId });
  for (const child of children) {
    await deleteRecursive(child._id as Types.ObjectId, userId);
  }
  await File.deleteOne({ _id: fileId, userId });
}
6. Key Takeaways
TypeScript types everything, even IDs and DB results → safer than plain JS.

interface = compile-time object shape, model = runtime class, document = runtime object.

Always use Promise / async when calling async DB operations.

Cast types when TS can’t infer them (as Types.ObjectId).

Recursive functions with async require await to ensure order.

7. Quick C++ Analogy Table
TypeScript	C++ Analogy	Notes
number	int/float	Basic types
string	std::string	Basic types
interface IUser	struct User	Compile-time shape
User (model)	class User	Runtime blueprint
IFile[]	std::vector<Node*>	Array of objects
Promise<void>	std::future<void>	Async operation result
await	future.get()	Wait for async operation
