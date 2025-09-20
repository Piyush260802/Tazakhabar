# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Publishing to GitHub

To publish your project to a new GitHub repository, follow these steps from your local terminal:

1.  **Create a new repository on GitHub:**
    Go to [github.com/new](https://github.com/new) to create a new, empty repository for your project. Do not initialize it with a README or other files.

2.  **Initialize a Git repository locally:**
    If you haven't already, initialize a Git repository in your project's root directory.
    ```bash
    git init -b main
    ```

3.  **Add all your files and make your first commit:**
    ```bash
    git add .
    git commit -m "Initial commit"
    ```

4.  **Connect your local repository to the remote one on GitHub:**
    Replace `<YOUR_REPOSITORY_URL>` with the URL from the repository you created on GitHub.
    ```bash
    git remote add origin <YOUR_REPOSITORY_URL>
    ```

5.  **Push your code to GitHub:**
    This will upload your project files to the repository.
    ```bash
    git push -u origin main
    ```

Now your code is live on GitHub!
