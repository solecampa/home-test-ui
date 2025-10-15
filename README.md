-----

## README for the Automation UI Test Repository

### 📄 Project Description

This project contains a set of UI automation tests for a demo web application. The tests are written in **TypeScript** using the **Playwright** automation library. The solution is **Dockerized**, which allows for consistent and reproducible execution in any environment.

### 📋 Prerequisites

Before you start, make sure you have the following software installed on your machine:

  * **Git**: To clone the repository.
  * **Docker** and **Docker Compose**: To build and run the application and tests in containers.

### ⚙️ Setup and Execution

Follow these steps to get the code, set up the environment, and run the tests.

#### 1\. Get the Repository

Clone this repository to your local machine using Git:

```bash
git clone https://github.com/your-username/home-test.git
cd home-test-ui
```

#### 2\. Run the Application and Tests

The solution uses Docker Compose to orchestrate the demo application and the testing environment. The services will start in the following order:

1.  **`app`**: Downloads and runs the demo web app container.
2.  **`tests`**: Builds the test container from the `Dockerfile` and waits for the application to be available before executing the tests.

Run the following command from the project's root directory to start everything:

```bash
docker compose up
```

**Note**: The `docker compose up` command will run the tests and keep the containers running.

#### 3\. Run the Tests Independently

If the application containers are already running (you can check with `docker ps`), you can run the tests at any time with this command. This creates a temporary container for the tests, which is automatically removed upon completion.

```bash
docker compose run --rm tests
```

### 📝 Test Scenarios

The tests cover the following main scenarios in the demo application:

  * **Login**: Success and failure cases.
  * **Checkout Form**: Form validation and alert handling.
  * **Cart & Grid**: Verification of cart totals and product grid data.
  * **Search**: Search cases with results and empty searches.

### 📦 Technologies Used

  * **Playwright**: Automation framework.
  * **TypeScript**: Programming language.
  * **Docker** and **Docker Compose**: For environment orchestration and isolation.
