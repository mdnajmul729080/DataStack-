from setuptools import setup, find_packages

setup(
    name="datastack-sdk",
    version="1.0.0",
    description="Python client SDK for DataStack Universal Realtime Data Collection Platform",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    author="DataStack Engine Team",
    packages=find_packages(),
    install_requires=[
        "python-socketio[client]>=5.11.0",
        "requests>=2.31.0",
        "websocket-client>=1.7.0"
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.8",
)
