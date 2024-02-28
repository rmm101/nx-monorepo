# Nx monorepo

The nx-monorepo project is intended as an accelerator for any 101 Ways consultant who is building a React/Next.js stack for a client. The project should contain the basic features a developer would expect. Beyond React and Next.js there are test implemented in Playwright. There are Github actions that will deploy the projects within the monorepo to Vercel. This represents current best practice for getting started quickly and minimising optimisation in production.

This monorepo has been generated using NX version 17 and following the [documentation](https://nx.dev/getting-started).

This monorepo is structured as follows:

- `react-store`: React project using Vite as a bundler, CSS and Typescript. This project is linked to project react-store-e2e.
- `next-inventory`: Next.js project using CSS and Typescript. The project is integrated with Contentful and pulls data using GraphQL. Also it is linked to project next-inventory-e2e.
- `next-payments`: Next.js project using CSS and Typescript. This project is linked to project next-payments-e2e.
- `react-store-e2e`: e2e project configured to use Cypress. This project depends on react-store project.
- `next-inventory-e2e`: e2e project configured to use Cypress. This project depends on next-inventory project.
- `next-payments-e2e`: e2e project configured to use Playwright. This project depends on next-payments project.
- `next-components`: Shared library for Next.js components using CSS and Typescript. This library is used by the next-inventory and next-payments projects.
- `react-components`: Shared library for React components using CSS and Typescript. This library is used by the react-store project.
- `utils`: Shared library for functions. This library is used by the next-payments and react-store projects.
- `types`: Shared library for types and interfaces. This library is used by the next-inventory project and the next-components library.

## How to install

1. Clone the repo

`git clone git@github.com:101-Ways/nx-monorepo.git`

2. Install dependencies

`npm install`

## List of targets

- Start the projects individually

`nx serve react-store`

`nx serve next-inventory`

`nx serve next-payments`

Open your browser and navigate to http://localhost:4200/.

- Run tests

`nx test react-store`

`nx test next-inventory`

`nx test next-payments`

`nx test next-components`

`nx test react-components`

`nx test utils`

- Run e2e tests

`nx e2e react-store-e2e`

`nx e2e next-inventory-e2e`

`nx e2e next-payments-e2e`

- Run linting

`nx lint react-store`

`nx lint next-inventory`

`nx lint next-payments`

`nx lint react-store-e2e`

`nx lint next-inventory-e2e`

`nx lint next-payments-e2e`

`nx lint next-components`

`nx lint react-components`

`nx lint utils`

- Run all projects with same target at the same time

`nx run-many --targets=lint`

- Run all projects and multiple targets at the same time (If one of the projects does not have that target, then the process will fail)

`nx run-many --targets=lint,test,e2e`

- Run specific projects and multiple targets at the same time

`nx run-many -p next-inventory next-payments --targets=lint,test`

## Generate new elements to the project

- Generate a React project

`nx g @nx/react:app <my-project-name> --directory=apps/<my-project-name>`

- Generate a component in the React project or library

`nx g @nx/react:component <my-component-name> --project=<my-project-name>`

- Generate a Next.js project

`nx g @nx/next:app <my-project-name> --directory=apps/<my-project-name>`

- Generate a page in the Next.js project

`nx g @nx/next:page <my-page-name> --directory=apps/<my-project-name>/pages/<my-page-name>`

- Generate a library in React

`nx g @nx/react:library <library-name> --directory=libs/<library-name> --unitTestRunner=vitest --bundler=none`

- Generate a library in Next.js

`nx g @nx/next:lib <library-name>`

- Generate a library in Typescript

`nx g @nx/js:lib <library-name>`

All libraries that we generate automatically have aliases created in the root-level `tsconfig.base.json`.

```
{
  "compilerOptions": {
    ...
    "paths": {
      "@react-monorepo/next-components": ["libs/next-components/src/index.ts"],
      "@react-monorepo/next-components/server": [
        "libs/next-components/src/server.ts"
      ],
      "@react-monorepo/react-components": ["libs/react-components/src/index.ts"],
      "@react-monorepo/utils": ["libs/utils/src/index.ts"],
      "@react-monorepo/types": ["libs/types/src/index.ts"],
    },
    ...
  },
}
```

## Rename projects

The following command renames the project and updates the dependencies.

```
nx g mv --project next-inventory new-next-inventory
nx g mv --project next-inventory-e2e new-next-inventory-e2e
```

## Delete projects

The following command deletes the project. If the project depends on another project, it won't work. To resolve this, you need to remove the dependent project first.

```
nx g rm next-inventory-e2e
nx g rm next-inventory
```

## Rename monorepo

The process for renaming a monorepo must be done manually since there is no direct command available for this task. You'll need to search and replace all instances of the string `@react-monorepo` with the new desired name. After this, it's necessary to delete the current `package-lock.json` file. Finally, by running `npm install`, a new 'package-lock.json' will be generated, reflecting the changes and new project name.

## Import components from the libraries into the projects

```
import { ProductList } from '@react-monorepo/products';

const Products = () => {
  return (
    <div>
      <h1>Products page</h1>
      <ProductList />
    </div>
  );
};

export default Products;
```

## Visualize project structure

`nx graph`

<img width="1141" alt="Screenshot 2024-01-23 at 14 55 51" src="https://github.com/101-Ways/nx-monorepo/assets/147872465/b4ff78c8-9c3d-43fc-befa-d15aa30f0ef1">

<img width="280" alt="Screenshot 2024-01-23 at 14 56 13" src="https://github.com/101-Ways/nx-monorepo/assets/147872465/9afc1c0b-cefa-477b-8274-8ae72e7e483a">

## Deploy projects

### Integrate with Nx Cloud

Each [Nx Cloud account](https://nx.app/) has its own access token. This token is used in your Nx project to authenticate with the Nx Cloud and determine which account to send data to. Linking an Nx project to different Nx Cloud accounts can be useful in scenarios where you have multiple environments (like development, staging, production).

The access token is typically set in the `nx.json` file in your project. You can find or set the token under the nxCloud key:

```
"nxCloud": {
  "nxCloudAccessToken": "<access-token>"
}
```

When setting up nx cloud for the first time, after linking your nx cloud account to your github repo the following command will automatically set `nxCloudAccessToken` for you.

```
npx nx connect-to-nx-cloud
```

### Why Nx Cloud?

Nx Cloud, specifically designed for monorepos built with Nx, offers several advantages over other CI (Continuous Integration) solutions when working with Nx-based monorepos. Here are some key benefits:

- Deep Integration with Nx: Nx Cloud is tailored for Nx workspaces, providing optimized performance and functionality. This deep integration means you can leverage Nx features more effectively compared to general-purpose CI tools.

- Distributed Task Execution: Nx Cloud can distribute tasks across multiple machines, efficiently parallelizing workloads. This feature is particularly beneficial for large monorepos where build and test tasks can be time-consuming.

- Intelligent Computation Caching: One of the standout features of Nx Cloud is its computation caching. It stores the outputs of commands (like builds and tests) and reuses them when the input files haven't changed. This can significantly speed up the CI process, as repeated tasks don't need to be executed from scratch every time.

- Affected Commands Optimization: Nx Cloud enhances the power of Nx’s ‘affected’ commands, which identify and run tasks only on affected projects in a monorepo. This targeted execution saves time and resources in the CI pipeline, as only necessary tasks are run.

- Insights and Analytics: Nx Cloud provides detailed insights and analytics about your development workflow, including time spent on different tasks and potential optimization areas. This data can be invaluable for improving your CI/CD processes.

- Seamless Collaboration: For teams working on a shared Nx workspace, Nx Cloud synchronizes the cache across all team members, ensuring everyone benefits from shared computation results. This feature enhances collaboration and consistency across the team.

- Easy Setup and Maintenance: Since Nx Cloud is designed for Nx, the setup and maintenance are generally simpler and more straightforward compared to configuring a generic CI tool to work efficiently with an Nx monorepo.

- Scalability: Nx Cloud is designed to scale seamlessly with your project. As your monorepo grows, Nx Cloud’s distributed builds and intelligent caching can handle the increased workload without significant configuration changes.

- Reduced Build Times: Thanks to its caching and distributed execution, Nx Cloud often leads to reduced build times compared to traditional CI solutions, especially for large codebases.

- Cost-Effective: By reducing build times and optimizing resource usage, Nx Cloud can be a more cost-effective solution, especially for teams that rely heavily on CI/CD pipelines for their development workflow.

In summary, Nx Cloud is an excellent choice for teams working with Nx-based monorepos due to its specialized features that are tailored to optimize and streamline the development process inherent to monorepos.

### Setting up CI for Nx Cloud

To set up Continuous Integration (CI):

1. Execute the command `nx generate ci-workflow --ci=github`

This generates a default CI configuration (`cy.yml`) for Nx Cloud, enabling distributed task execution. Tasks run in parallel on separate machines, optimizing the workflow.

Here's a breakdown of how it works:

- Trigger Conditions

  - On Push to Main Branch: The CI process triggers whenever code is pushed to the main branch.
  - On Pull Request: It also triggers for any pull requests made to the repository.

- Permissions

  - Actions and Contents Read: Permissions are set for reading actions and repository contents. This is necessary for Nx Cloud integrations and actions to work correctly.

- Jobs
  The CI process is divided into two main jobs: main and agents.

  - Main Job

    - Name and Workflow: Named "Nx Cloud - Main Job," it uses a workflow defined in nx-cloud-main.yml at version v0.13.1.
    - Configuration:
      - main-branch-name: Specifies the main branch as main.
      - number-of-agents: Sets the number of Nx Cloud agents to 3.
      - init-commands: Initializes the CI run with specific commands, in this case, starting the Nx Cloud CI run and configuring it to stop agents after the "build" stage.
      - parallel-commands: Executes commands in parallel. Here, it's running nx format:check while recording the execution with Nx Cloud.
      - parallel-commands-on-agents: Defines more parallel commands to run on the Nx Cloud agents. These include:
        - Linting affected projects.
        - Running tests on affected projects with code coverage.
        - Running end-to-end (e2e) tests for the next-payments-e2e project.
        - Building affected projects.

  - Agents Job

    - Name and Workflow: Named "Nx Cloud - Agents," it uses a workflow defined in nx-cloud-agents.yml at version v0.13.1.
    - Configuration:
      - number-of-agents: Also sets the number of Nx Cloud agents to 3 for this job.

- How It Works

  1. Initiation: When the trigger conditions are met (push to main or a pull request), the CI process starts.
  2. Main Job Execution: The main job starts and performs initial commands, including starting the Nx Cloud CI run. It then executes parallel commands for code formatting checks.
  3. Parallel Execution on Agents: The main job then triggers parallel commands on Nx Cloud agents, which handle linting, testing, e2e testing for a specific project, and building of affected projects.
  4. Agents Job: Concurrently, the agents' job provisions the specified number of agents to handle the workload distributed by the main job.

- Key Points

  - The configuration is designed to efficiently handle multiple tasks by leveraging parallel processing.
  - The use of Nx Cloud means that the CI process is optimized for Nx-powered monorepos, offering faster builds, tests, and better resource utilization.
  - The workflow is scalable and can handle complex monorepo setups by distributing tasks across multiple agents.
  - The version (v0.13.1) of the workflows used (nx-cloud-main.yml and nx-cloud-agents.yml) should be compatible with the Nx and Nx Cloud versions used in the project.
  - This setup is particularly effective for large-scale projects where different parts of the codebase can be affected independently, allowing for more efficient CI runs.

### Vercel

This monorepo contains three applications, so create three separate projects in Vercel by importing the monorepo from `https://github.com/101-Ways/nx-monorepo`. The projects are:

#### react-store (React project using Vite)

<img width="998" alt="Screenshot 2024-01-05 at 17 08 53" src="https://github.com/101-Ways/nx-monorepo/assets/147872465/39304582-b757-4b12-8c0c-a1442c7e3149">

#### next-inventory (Next.js project)

<img width="1005" alt="Screenshot 2024-01-05 at 17 08 33" src="https://github.com/101-Ways/nx-monorepo/assets/147872465/a3b6e47c-6c60-48e7-b93d-b68d3c551c16">

To be able to use test this project locally or deploy to production, you will need to set up a Contentful account, the associated environment variables.
More details on this can be found in the Contentful section below.

#### next-payments (Next.js project)

<img width="959" alt="Screenshot 2024-01-09 at 14 01 32" src="https://github.com/101-Ways/nx-monorepo/assets/147872465/f01fcf59-bef6-4fc2-83c2-f2b6759b9a70">

Vercel detects changes in the main branch and attempts to deploy both projects. However, to deploy only the projects affected by the latest changes, apply the following configuration for each project. This configuration cancels the deployment if the project has not been affected by the latest changes.

<img width="1012" alt="Screenshot 2024-01-05 at 17 13 08" src="https://github.com/101-Ways/nx-monorepo/assets/147872465/247af290-cbd4-4931-971e-73942cf9ef29">

**Note**: Replace `react-store` by the name of the project `next-inventory` or `next-payments`.

Learn more about [deploying applications to Vercel](https://nx.dev/recipes/react/deploy-nextjs-to-vercel).

## Playwright

This monorepo contains a single project configured for end-to-end (e2e) testing with Playwright, named `next-payments-e2e`.

There are two methods to run the tests:

1. From the root level of the project, execute the command:

`nx e2e next-payments-e2e`

2. From within the project directory, execute the command:

`npx playwright test`

**Note**: Optional flags can be added to the above command. Learn more at [Playwright CLI Documentation](https://playwright.dev/docs/test-cli).

The `playwright.config.ts` file within the project has been adjusted to specify that tests are run only in Chrome and one test file is executed at a time.

For additional configuration options, see [Nx Playwright Executor Documentation](https://nx.dev/nx-api/playwright/executors/playwright).

The command to run the e2e tests has been integrated into the continuous integration (CI) workflow `ci.yml` file, ensuring tests are executed only for this project when relevant changes are made.

```
  npx nx affected --target=lint --parallel=3
  npx nx affected --target=test --parallel=3 --ci --code-coverage
  npx nx run-many --target=e2e --projects=next-payments-e2e --parallel=3 //Command added
  npx nx affected --target=build --parallel=3
```

**Note**: The other two projects in the monorepo configured for e2e testing currently do not contain any tests.

Since the `next-payments` project currently lacks functionality, the executed tests target the external website: [https://rahulshettyacademy.com/client](https://rahulshettyacademy.com/client).

**Note**: Access credentials for the website:

```
Email: "anshika@gmail.com"
Password: "Iamking@000"
```

Multiple testing approaches have been implemented, allowing for flexibility based on the client's requirements.

**Note**: In case of test failures, it may be due to changes in identifiers on the external website. Please verify the correct identifiers on the website and update the tests accordingly.

To learn more about Playwright, visit [Playwright Documentation](https://playwright.dev/docs/intro).

## Contentful (CMS)

Contentful is a popular headless Content Management System (CMS) that provides a flexible and developer-friendly platform for managing and delivering content across various channels and devices. Unlike traditional CMSs which tightly couple content with a specific output (like a web page), Contentful is "headless", meaning it's focused solely on the backend management of content, leaving the frontend (the "head") to be handled separately.

Contentful has been integrated into the `next-inventory` project, with data being pulled using GraphQL.

To use GraphQL, two dependencies have been installed: "@apollo/client" and "graphql".

The initial step involves creating a file named `apollo-client.ts` at the root of the next-inventory project, where the ApolloClient instance is initialized.

```
  const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.NODE_ENV}`,
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
    cache: new InMemoryCache(),
  });
```

To establish the connection and pull data, both the `Space ID` = `CONTENTFUL_SPACE_ID` and the `Content Delivery API - access token` = `CONTENTFUL_ACCESS_TOKEN` are required to either be set in the `.env` file or set in environment variables section of `Vercel`, when being tested locally, or deployed to `Vercel` respectively.

These can be obtained from your personal [Contentful](https://www.contentful.com/) account.

Once logged in, go to `Settings` -> `API Keys`.

Select `Marketplace Apps Key`.
![](/Users/reecemiller-mcpherson/Desktop/Screenshot 2024-02-28 at 14.23.58.png)

In Contentful, you can create a project, referred to as a 'space,' where you manage your content. Within each space, it's possible to set up different environments. Each of these environments can have its own unique access token. Alternatively, you can use a single access token and configure it to have permissions across multiple environments.

By default, you will have a master environment.

To create a new environment select `Settings` -> `Environment`. Then select the `Add environment` button and enter the name of the enviroments you want.
In order to get the project `next-inventory` mentioned earlier to deploy successfully on `Vercel`, you will need to create an environment named `production` and create the following models under that environment.

Under the `production` environment, create content model called `Product` and enter the fields in the image below with associated field types.

![](/Users/reecemiller-mcpherson/Desktop/Screenshot 2024-02-28 at 14.42.35.png)

Under the `Content` tab create a new entry for the `Product` content model populating the fields with any values and then publish.

![](/Users/reecemiller-mcpherson/Desktop/Screenshot 2024-02-28 at 14.47.22.png)

With this set up, you will be able to deploy next-inventory successfully on `Vercel`.

One of the many advantages of having distinct environments within the same space is the ability to systematically and controlledly merge changes from development to production. This approach ensures a smoother transition of updates and minimizes disruptions to the live environment.

A `queries` folder has been created to store all GraphQL queries. These queries will utilize the previously created ApolloClient instance.

Once a query is formulated, it can simply be invoked from pages such as `products/index.tsx` and `products/[...slug].tsx`.

**Note**: Environment variables are stored in the `.env` file.

## Outcome

When everything operates smoothly, this is the desired outcome.

<img width="1504" alt="Screenshot 2024-01-09 at 17 13 46" src="https://github.com/101-Ways/nx-monorepo/assets/147872465/54b0b104-036f-4118-a9c2-ff6efec513d3">

<img width="1505" alt="Screenshot 2024-01-09 at 16 22 30" src="https://github.com/101-Ways/nx-monorepo/assets/147872465/245e7290-8032-4372-8277-16ef2db3de65">

## Limitations

### React router and Vercel

To enable React Router in Vercel, the following configuration is added to the `vercel.json` file at the root of the project:

```
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

**Note**: This configuration has not yet been tested for dynamic routes.
