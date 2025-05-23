let courses = {
    "Fall 2022 (Freshman)": [
        {
            title: "Foundations of Computer Science",
            courseNum: "CSE215",
            grade: "A",
            desc: "Introduction to the logical and mathematical foundations of computer science. Topics include functions, relations, and sets; recursion; elementary logic; and mathematical induction and other proof techniques."
        },
        {
            title: "Data Structures",
            courseNum: "CSE214",
            grade: "A",
            desc: "An extension of programming methodology to data storage and manipulation on complex data sets. Topics include: programming and applications of data structures; stacks, queues, lists, binary trees, heaps, priority queues, balanced trees and graphs. Recursive programming is heavily utilized. Fundamental sorting and searching algorithms are examined along with informal efficiency comparisons."
        },
        {
            title: "Applied Linear Algebra",
            courseNum: "AMS210",
            grade: "A",
            desc: "An introduction to the theory and use of vectors and matrices. Matrix theory including systems of linear equations. Theory of Euclidean and abstract vector spaces. Eigenvectors and eigenvalues. Linear transformations."
        },
    ],
    "Spring 2023 (Freshman)": [
        {
            title: "System Funcamentals",
            courseNum: "CSE220",
            grade: "A-",
            desc: "Introduces systems-level programming concepts using the C language and assembly language, and explores the correspondence of programming constructs in these languages. Topics include internal data representation, basic instructions and control structures, bitwise operations, arithmetic operations, memory management, pointers, function calls and parameter passing, linking and loading. Included is an overview of computer architecture and organization topics, including von Neumann architecture, the memory hierarchy, and basics of pipelining."
        },
        {
            title: "Programming Abstractions",
            courseNum: "CSE216",
            grade: "A-",
            desc: "Intermediate-level programming concepts and paradigms, including functional programming, object-orientation, basics of type systems, memory management, program and data abstractions, parameter passing, modularity, and parallel programming. Includes weekly recitations, which provide students with experience in the practice of programming in a variety of high-level languages."
        },
        {
            title: "Survey of Probability and Statistics",
            courseNum: "AMS310",
            grade: "A",
            desc: "A survey of data analysis, probability theory, and statistics. Stem and leaf displays, box plots, schematic plots, fitting straight line relationships, discrete and continuous probability distributions, conditional distributions, binomial distribution, normal and t distributions, confidence intervals, and significance tests."
        }
    ],
    "Fall 2023 (Sophomore)": [
        {
            title: "System Fundamentals",
            courseNum: "CSE320",
            grade: "B+",
            desc: "This course introduces C programming and essential concepts of operating systems, concurrency, and performance analysis, focused around several cross-cutting examples, such as memory management, error handling, and threaded programming. In this course, operating systems concepts are considered from the point of view of the application programmer, and the focus is on APIs for interacting with an operating system."
        },
        {
            title: "Analysis of Algorithms",
            courseNum: "CSE373",
            grade: "A-",
            desc: "Mathematical analysis of a variety of computer algorithms including searching, sorting, matrix multiplication, fast Fourier transform, and graph algorithms. Time and space complexity. Upper-bound, lower- bound, and average-case analysis. Introduction to NP completeness. Some machine computation is required for the implementation and comparison of algorithms."
        },
    ],
    "Spring 2024 (Sophomore)": [
        {
            title: "Fundamentals of Software Development",
            courseNum: "CSE316",
            grade: "A",
            desc: "Introduction to systematic design, development and testing of software systems, including event-driven and Web programming, information management, databases, principles and practices for secure computing, and version control. Students apply these skills in the construction of large, robust programs."
        },
        {
            title: "Natural Language Processing",
            courseNum: "CSE354",
            grade: "A-",
            desc: "Natural language processing techniques power many intelligent language based applications. This course will introduce basic language analysis tasks such as language modeling and syntactic analysis, as well as core applications such as text classification, information extraction, question answering, and machine translation. The course will cover relevant algorithms, machine learning solutions, and evaluation methodologies."
        },
        {
            title: "CSE220 Teaching Assistant"
        }
    ],
    "Fall 2024 (Junior)": [
        {
            title: "Cloud Computing",
            courseNum: "CSE356",
            grade: "B+",
            desc: "Creating online services capable of handling millions of users requires a different mindset compared to traditional software development and deployment. Rather than building monolithic software packages from the ground up, bringing up modern online services calls for architecting systems by gluing together mature existing technologies deployed across many unreliable servers, working in concert to provide high-availability robust services. In this course, students will be exposed to the concepts and technologies behind deploying and scaling online services on the computing resources available in modern datacenters."
        },
        {
            title: "Statistical Methods for Data Science",
            courseNum: "CSE357",
            grade: "A",
            desc: "This interdisciplinary course introduces the mathematical concepts required to interpret results and subsequently draw conclusions from data in an applied manner. The course presents different techniques for applied statistical inference and data analysis, including their implementation in Python, such as parameter and distribution estimators, hypothesis testing, Bayesian inference, and likelihood."
        },
    ],
    "Spring 2025 (Junior)": [
        {
            title: "Finite Mathematical Structures",
            courseNum: "AMS301",
            grade: "A",
            desc: "An introduction to graph theory and combinatorial analysis. The emphasis is on solving applied problems rather than on theorems and proofs. Techniques used in problem solving include generating functions, recurrence relations, and network flows. This course develops the type of mathematical thinking that is fundamental to computer science and operations research."
        },
        {
            title: "Scripting Languages",
            courseNum: "CSE337",
            grade: "A-",
            desc: "Scripting languages are widely used in the IT industry. Programming with scripting languages, also known as scripting, has several advantages compared to programming with other types of languages in that scripts facilitate rapid program development; can automate high-level jobs or tasks very effectively; and can be used to compose various software components, even binaries, into more complex and powerful applications. This course introduces the principles of scripting, covers one or two selected scripting languages in depth, and illustrates the advanced use of scripting by extensive case studies in application areas such as system administration, web application development, graphical user interface development, and text processing."
        },
        {
            title: "CSE316 Teaching Assistant"
        }
    ],
}

export default courses;