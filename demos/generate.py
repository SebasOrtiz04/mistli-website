from sklearn.datasets import make_classification
import pandas as pd





X, y = make_classification(
    n_samples=1800,
    n_features=12,
    n_informative=9,
    n_redundant=2,
    n_repeated=0,

    n_classes=6,

    n_clusters_per_class=2,


    # #Caso fácil
    # class_sep=2.0,
    # flip_y=0.01,
    # #Caso normal
    # class_sep=1.2,
    # flip_y=0.04,
    #Caso difícil
    class_sep=0.7,
    flip_y=0.10,
    weights=None,

    random_state=42
)


columns = [
    f"feature_{i:02d}"
    for i in range(1, 13)
]


df = pd.DataFrame(
    X,
    columns=columns
)


df["target"] = [
    f"clase_{value}"
    for value in y
]


df.to_csv(
    "dataset.csv",
    index=False
)


print("Dataset generado correctamente")
print()
print(f"Registros: {len(df)}")
print(f"Features: {len(columns)}")
print(f"Clases: {df['target'].nunique()}")
print()
print(df["target"].value_counts())
print()
print(df.head())