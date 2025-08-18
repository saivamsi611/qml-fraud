Overview
This project focuses on detecting anomalies (fraudulent or unusual transactions) using Quantum Machine Learning (QML). Traditional machine learning models are widely used in fraud detection, but quantum methods can provide richer feature mappings and potential improvements in handling complex, high-dimensional datasets.
Our implementation explores quantum-enhanced anomaly detection and compares it with classical approaches to highlight the advantages and limitations of QML in financial transaction security.
1.Problem Statement
Financial fraud is a growing threat in digital transactions. Classical ML techniques (Random Forest, Isolation Forest, SVM, etc.) are effective but may struggle with scalability and subtle fraud patterns.
2.The goal of this project is to:
Use Quantum Machine Learning techniques (Quantum Kernel, Variational Quantum Classifiers, etc.) to detect anomalies.
Compare performance against classical ML baselines.
Provide a reproducible pipeline for QML-based fraud detection.
3. Tech Stack
Languages: python
Quantum Libraries: Qiskit / PennyLane
ML Libraries: Scikit-learn, NumPy, Pandas
Visualization: Matplotlib, Seaborn
4.Dataset
We used a transaction dataset (such as the Credit Card Fraud Detection dataset) which contains:
Features: Transaction amount, time, anonymized features (V1–V28)
Target: 0 = Normal, 1 = Fraud
Note: The dataset is imbalanced, making it a suitable case for anomaly detection.
5.Methodology
Data Preprocessing
Normalization and scaling
Train-test split with majority normal transactions for training
Classical Baseline Models
One-Class SVM
Isolation Forest
Quantum Machine Learning Models
Quantum Kernel + One-Class SVM
Variational Quantum Classifier (VQC)
Hybrid quantum-classical anomaly detection
Evaluation Metrics
Precision, Recall, F1-score, ROC-AUC
6.Results (Expected)
QML models demonstrate the ability to capture complex patterns in transaction data.
Comparison between classical and quantum methods shows potential improvements in anomaly detection.
-- How to Run
# Clone the repository
git clone https://github.com/your-username/qml-anomaly-detection.git
cd qml-anomaly-detection
# Install dependencies
pip install -r requirements.txt
# Run preprocessing
python preprocess.py
# Train and evaluate classical & quantum models
python train.py
python train_qml.py
-- Future Work
Real-time fraud detection pipeline
Experimenting with larger datasets and more quantum features
Running models on real quantum hardware instead of simulators
--Contributors
Team Name: QuantumGuard
Members:
