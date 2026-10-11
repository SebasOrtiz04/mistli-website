import os
import json
import random
import warnings

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

import mlflow
import mlflow.keras
from mlflow.models import infer_signature

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report,
    confusion_matrix,
    roc_curve,
    auc,
    precision_recall_curve,
    average_precision_score,
)
from sklearn.preprocessing import label_binarize
from config import MLFLOW_TRACKING_URI

# ============================================================
# CONFIGURACIÓN
# ============================================================

SEED = 42

DATASET_PATH = "dataset.csv"
TARGET_COLUMN = "target"

EXPERIMENT_NAME = "clasificador_red_neuronal"

MODEL_NAME = "clasificador_red_neuronal"

TEST_SIZE = 0.20
VALIDATION_SIZE = 0.20

EPOCHS = 100
BATCH_SIZE = 32

LEARNING_RATE = 0.001

HIDDEN_LAYER_1 = 128
HIDDEN_LAYER_2 = 64
HIDDEN_LAYER_3 = 32

DROPOUT_1 = 0.30
DROPOUT_2 = 0.20

PATIENCE = 15


# ============================================================
# REPRODUCIBILIDAD
# ============================================================

os.environ["PYTHONHASHSEED"] = str(SEED)

random.seed(SEED)
np.random.seed(SEED)
tf.random.set_seed(SEED)


# ============================================================
# DIRECTORIOS
# ============================================================

ARTIFACT_DIR = "mlflow_artifacts"

os.makedirs(ARTIFACT_DIR, exist_ok=True)


# ============================================================
# MLFLOW
# ============================================================

mlflow.set_tracking_uri(MLFLOW_TRACKING_URI)

mlflow.set_experiment(EXPERIMENT_NAME)


# ============================================================
# FUNCIONES AUXILIARES
# ============================================================

def save_figure(filename):
    """
    Guarda la figura y devuelve la ruta.
    """
    path = os.path.join(ARTIFACT_DIR, filename)

    plt.tight_layout()
    plt.savefig(path, dpi=200, bbox_inches="tight")
    plt.close()

    return path


def log_class_distribution(y, class_names, filename):
    """
    Distribución de clases.
    """

    counts = pd.Series(y).value_counts().sort_index()

    plt.figure(figsize=(10, 6))

    plt.bar(
        [class_names[i] for i in counts.index],
        counts.values
    )

    plt.xlabel("Clase")
    plt.ylabel("Número de muestras")
    plt.title("Distribución de clases")

    plt.xticks(rotation=45, ha="right")

    path = save_figure(filename)

    mlflow.log_artifact(path)


def plot_training_history(history):
    """
    Curvas de entrenamiento.
    """

    history_df = pd.DataFrame(history.history)

    history_df.to_csv(
        os.path.join(
            ARTIFACT_DIR,
            "training_history.csv"
        ),
        index=False
    )

    mlflow.log_artifact(
        os.path.join(
            ARTIFACT_DIR,
            "training_history.csv"
        )
    )

    # --------------------------------------------------------
    # LOSS
    # --------------------------------------------------------

    plt.figure(figsize=(10, 6))

    plt.plot(
        history.history["loss"],
        label="Train Loss"
    )

    plt.plot(
        history.history["val_loss"],
        label="Validation Loss"
    )

    plt.xlabel("Epoch")
    plt.ylabel("Loss")
    plt.title("Training vs Validation Loss")

    plt.legend()

    loss_path = save_figure(
        "training_validation_loss.png"
    )

    mlflow.log_artifact(loss_path)

    # --------------------------------------------------------
    # ACCURACY
    # --------------------------------------------------------

    plt.figure(figsize=(10, 6))

    plt.plot(
        history.history["accuracy"],
        label="Train Accuracy"
    )

    plt.plot(
        history.history["val_accuracy"],
        label="Validation Accuracy"
    )

    plt.xlabel("Epoch")
    plt.ylabel("Accuracy")
    plt.title("Training vs Validation Accuracy")

    plt.legend()

    accuracy_path = save_figure(
        "training_validation_accuracy.png"
    )

    mlflow.log_artifact(accuracy_path)


def plot_confusion_matrix(y_true, y_pred, class_names):
    """
    Matriz de confusión.
    """

    cm = confusion_matrix(
        y_true,
        y_pred
    )

    plt.figure(
        figsize=(
            max(8, len(class_names)),
            max(6, len(class_names))
        )
    )

    sns.heatmap(
        cm,
        annot=True,
        fmt="d",
        cmap="Blues",
        xticklabels=class_names,
        yticklabels=class_names
    )

    plt.xlabel("Predicción")
    plt.ylabel("Real")
    plt.title("Matriz de confusión")

    path = save_figure(
        "confusion_matrix.png"
    )

    mlflow.log_artifact(path)


def plot_normalized_confusion_matrix(
    y_true,
    y_pred,
    class_names
):
    """
    Matriz de confusión normalizada.
    """

    cm = confusion_matrix(
        y_true,
        y_pred,
        normalize="true"
    )

    plt.figure(
        figsize=(
            max(8, len(class_names)),
            max(6, len(class_names))
        )
    )

    sns.heatmap(
        cm,
        annot=True,
        fmt=".2f",
        cmap="Blues",
        xticklabels=class_names,
        yticklabels=class_names
    )

    plt.xlabel("Predicción")
    plt.ylabel("Real")

    plt.title(
        "Matriz de confusión normalizada"
    )

    path = save_figure(
        "confusion_matrix_normalized.png"
    )

    mlflow.log_artifact(path)


def plot_roc_curve(
    y_true,
    probabilities,
    num_classes,
    class_names
):
    """
    ROC multiclass One-vs-Rest.
    """

    y_true_bin = label_binarize(
        y_true,
        classes=np.arange(num_classes)
    )

    plt.figure(figsize=(10, 8))

    for i in range(num_classes):

        fpr, tpr, _ = roc_curve(
            y_true_bin[:, i],
            probabilities[:, i]
        )

        roc_auc = auc(
            fpr,
            tpr
        )

        plt.plot(
            fpr,
            tpr,
            label=f"{class_names[i]} AUC={roc_auc:.3f}"
        )

    plt.plot(
        [0, 1],
        [0, 1],
        linestyle="--"
    )

    plt.xlabel("False Positive Rate")
    plt.ylabel("True Positive Rate")

    plt.title(
        "ROC Curve - Multiclass"
    )

    plt.legend(
        bbox_to_anchor=(1.05, 1),
        loc="upper left"
    )

    path = save_figure(
        "roc_multiclass.png"
    )

    mlflow.log_artifact(path)


def plot_precision_recall_curve_multiclass(
    y_true,
    probabilities,
    num_classes,
    class_names
):
    """
    Precision-Recall multiclass.
    """

    y_true_bin = label_binarize(
        y_true,
        classes=np.arange(num_classes)
    )

    plt.figure(figsize=(10, 8))

    for i in range(num_classes):

        precision, recall, _ = precision_recall_curve(
            y_true_bin[:, i],
            probabilities[:, i]
        )

        ap = average_precision_score(
            y_true_bin[:, i],
            probabilities[:, i]
        )

        plt.plot(
            recall,
            precision,
            label=f"{class_names[i]} AP={ap:.3f}"
        )

    plt.xlabel("Recall")
    plt.ylabel("Precision")

    plt.title(
        "Precision-Recall Curve - Multiclass"
    )

    plt.legend(
        bbox_to_anchor=(1.05, 1),
        loc="upper left"
    )

    path = save_figure(
        "precision_recall_multiclass.png"
    )

    mlflow.log_artifact(path)


def plot_probability_distribution(
    probabilities
):
    """
    Distribución de las probabilidades máximas.
    """

    max_probabilities = np.max(
        probabilities,
        axis=1
    )

    plt.figure(figsize=(10, 6))

    plt.hist(
        max_probabilities,
        bins=20
    )

    plt.xlabel(
        "Probabilidad máxima predicha"
    )

    plt.ylabel(
        "Número de muestras"
    )

    plt.title(
        "Distribución de confianza del modelo"
    )

    path = save_figure(
        "prediction_confidence_distribution.png"
    )

    mlflow.log_artifact(path)


def save_classification_report(
    y_true,
    y_pred,
    class_names
):
    """
    Classification report.
    """

    report = classification_report(
        y_true,
        y_pred,
        target_names=class_names,
        output_dict=True
    )

    report_df = pd.DataFrame(report).transpose()

    path = os.path.join(
        ARTIFACT_DIR,
        "classification_report.csv"
    )

    report_df.to_csv(path)

    mlflow.log_artifact(path)

    return report


def log_metrics(
    y_true,
    y_pred
):
    """
    Métricas globales.
    """

    accuracy = accuracy_score(
        y_true,
        y_pred
    )

    precision = precision_score(
        y_true,
        y_pred,
        average="weighted",
        zero_division=0
    )

    recall = recall_score(
        y_true,
        y_pred,
        average="weighted",
        zero_division=0
    )

    f1 = f1_score(
        y_true,
        y_pred,
        average="weighted",
        zero_division=0
    )

    mlflow.log_metric(
        "test_accuracy",
        accuracy
    )

    mlflow.log_metric(
        "test_precision_weighted",
        precision
    )

    mlflow.log_metric(
        "test_recall_weighted",
        recall
    )

    mlflow.log_metric(
        "test_f1_weighted",
        f1
    )

    return {
        "accuracy": accuracy,
        "precision": precision,
        "recall": recall,
        "f1": f1
    }


# ============================================================
# CARGAR DATASET
# ============================================================

print("Cargando dataset...")

df = pd.read_csv(DATASET_PATH)

print(
    f"Dataset shape: {df.shape}"
)

print(
    f"Columnas: {list(df.columns)}"
)


# ============================================================
# VALIDACIONES
# ============================================================

if TARGET_COLUMN not in df.columns:

    raise ValueError(
        f"La columna '{TARGET_COLUMN}' "
        "no existe en el dataset."
    )


df = df.dropna()


# ============================================================
# X / Y
# ============================================================

X = df.drop(
    columns=[TARGET_COLUMN]
)

y = df[TARGET_COLUMN]


# ============================================================
# CODIFICAR TARGET
# ============================================================

label_encoder = LabelEncoder()

y_encoded = label_encoder.fit_transform(y)

class_names = list(
    label_encoder.classes_
)

num_classes = len(
    class_names
)

print(
    f"Número de clases: {num_classes}"
)

print(
    f"Clases: {class_names}"
)


# ============================================================
# VALIDAR FEATURES NUMÉRICAS
# ============================================================

non_numeric_columns = X.select_dtypes(
    exclude=[np.number]
).columns

if len(non_numeric_columns) > 0:

    raise ValueError(
        "El dataset contiene columnas no numéricas: "
        f"{list(non_numeric_columns)}"
    )


X = X.astype("float32")


# ============================================================
# TRAIN / TEST
# ============================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_encoded,
    test_size=TEST_SIZE,
    random_state=SEED,
    stratify=y_encoded
)


# ============================================================
# TRAIN / VALIDATION
# ============================================================

validation_relative_size = (
    VALIDATION_SIZE /
    (1 - TEST_SIZE)
)

X_train, X_val, y_train, y_val = train_test_split(
    X_train,
    y_train,
    test_size=validation_relative_size,
    random_state=SEED,
    stratify=y_train
)


print(
    f"Train: {X_train.shape}"
)

print(
    f"Validation: {X_val.shape}"
)

print(
    f"Test: {X_test.shape}"
)


# ============================================================
# NORMALIZACIÓN
# ============================================================

scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(
    X_train
)

X_val_scaled = scaler.transform(
    X_val
)

X_test_scaled = scaler.transform(
    X_test
)


# ============================================================
# MODELO
# ============================================================

input_dim = X_train_scaled.shape[1]


model = keras.Sequential(
    [
        layers.Input(
            shape=(input_dim,)
        ),

        layers.Dense(
            HIDDEN_LAYER_1,
            activation="relu"
        ),

        layers.BatchNormalization(),

        layers.Dropout(
            DROPOUT_1
        ),

        layers.Dense(
            HIDDEN_LAYER_2,
            activation="relu"
        ),

        layers.BatchNormalization(),

        layers.Dropout(
            DROPOUT_2
        ),

        layers.Dense(
            HIDDEN_LAYER_3,
            activation="relu"
        ),

        layers.Dense(
            num_classes,
            activation="softmax"
        )
    ]
)


optimizer = keras.optimizers.Adam(
    learning_rate=LEARNING_RATE
)


model.compile(
    optimizer=optimizer,
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)


model.summary()


# ============================================================
# CALLBACKS
# ============================================================

early_stopping = keras.callbacks.EarlyStopping(
    monitor="val_loss",
    patience=PATIENCE,
    restore_best_weights=True
)


reduce_lr = keras.callbacks.ReduceLROnPlateau(
    monitor="val_loss",
    factor=0.5,
    patience=5,
    min_lr=1e-7
)


# ============================================================
# MLFLOW RUN
# ============================================================

with mlflow.start_run(
    run_name="red_neuronal_multiclase"
):

    print(
        "\nMLflow Run iniciado..."
    )

    # --------------------------------------------------------
    # TAGS
    # --------------------------------------------------------

    mlflow.set_tags(
        {
            "model_type": "neural_network",
            "framework": "tensorflow_keras",
            "task": "multiclass_classification",
            "dataset": DATASET_PATH,
            "target": TARGET_COLUMN
        }
    )

    # --------------------------------------------------------
    # PARAMETROS
    # --------------------------------------------------------

    mlflow.log_params(
        {
            "seed": SEED,

            "test_size": TEST_SIZE,
            "validation_size": VALIDATION_SIZE,

            "epochs": EPOCHS,
            "batch_size": BATCH_SIZE,

            "learning_rate": LEARNING_RATE,

            "hidden_layer_1": HIDDEN_LAYER_1,
            "hidden_layer_2": HIDDEN_LAYER_2,
            "hidden_layer_3": HIDDEN_LAYER_3,

            "dropout_1": DROPOUT_1,
            "dropout_2": DROPOUT_2,

            "patience": PATIENCE,

            "input_features": input_dim,
            "num_classes": num_classes,

            "train_samples": len(X_train),
            "validation_samples": len(X_val),
            "test_samples": len(X_test)
        }
    )

    # --------------------------------------------------------
    # INFORMACIÓN DEL DATASET
    # --------------------------------------------------------

    dataset_info = {
        "dataset_path": DATASET_PATH,
        "rows": len(df),
        "columns": len(df.columns),
        "features": list(X.columns),
        "target": TARGET_COLUMN,
        "num_classes": num_classes,
        "classes": class_names
    }

    dataset_info_path = os.path.join(
        ARTIFACT_DIR,
        "dataset_info.json"
    )

    with open(
        dataset_info_path,
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            dataset_info,
            f,
            indent=4,
            ensure_ascii=False
        )

    mlflow.log_artifact(
        dataset_info_path
    )

    # --------------------------------------------------------
    # DISTRIBUCIÓN DE CLASES
    # --------------------------------------------------------

    log_class_distribution(
        y_encoded,
        class_names,
        "class_distribution.png"
    )

    # --------------------------------------------------------
    # ENTRENAMIENTO
    # --------------------------------------------------------

    print(
        "\nEntrenando modelo..."
    )

    history = model.fit(
        X_train_scaled,
        y_train,

        validation_data=(
            X_val_scaled,
            y_val
        ),

        epochs=EPOCHS,
        batch_size=BATCH_SIZE,

        callbacks=[
            early_stopping,
            reduce_lr
        ],

        verbose=1
    )

    # --------------------------------------------------------
    # LOG DE HISTORIAL
    # --------------------------------------------------------

    plot_training_history(
        history
    )

    # --------------------------------------------------------
    # EVALUACIÓN TEST
    # --------------------------------------------------------

    print(
        "\nEvaluando modelo..."
    )

    test_loss, test_accuracy = model.evaluate(
        X_test_scaled,
        y_test,
        verbose=0
    )

    mlflow.log_metric(
        "test_loss",
        test_loss
    )

    mlflow.log_metric(
        "test_keras_accuracy",
        test_accuracy
    )

    # --------------------------------------------------------
    # PREDICCIONES
    # --------------------------------------------------------

    probabilities = model.predict(
        X_test_scaled,
        verbose=0
    )

    y_pred = np.argmax(
        probabilities,
        axis=1
    )

    # --------------------------------------------------------
    # MÉTRICAS
    # --------------------------------------------------------

    metrics = log_metrics(
        y_test,
        y_pred
    )

    print(
        "\nMétricas:"
    )

    for name, value in metrics.items():

        print(
            f"{name}: {value:.4f}"
        )

    # --------------------------------------------------------
    # CLASSIFICATION REPORT
    # --------------------------------------------------------

    report = save_classification_report(
        y_test,
        y_pred,
        class_names
    )

    # --------------------------------------------------------
    # MATRIZ DE CONFUSIÓN
    # --------------------------------------------------------

    plot_confusion_matrix(
        y_test,
        y_pred,
        class_names
    )

    plot_normalized_confusion_matrix(
        y_test,
        y_pred,
        class_names
    )

    # --------------------------------------------------------
    # ROC
    # --------------------------------------------------------

    if num_classes >= 2:

        plot_roc_curve(
            y_test,
            probabilities,
            num_classes,
            class_names
        )

        plot_precision_recall_curve_multiclass(
            y_test,
            probabilities,
            num_classes,
            class_names
        )

    # --------------------------------------------------------
    # DISTRIBUCIÓN DE CONFIANZA
    # --------------------------------------------------------

    plot_probability_distribution(
        probabilities
    )

    # --------------------------------------------------------
    # PREDICCIONES CSV
    # --------------------------------------------------------

    predictions_df = X_test.copy()

    predictions_df["actual"] = [
        class_names[i]
        for i in y_test
    ]

    predictions_df["predicted"] = [
        class_names[i]
        for i in y_pred
    ]

    predictions_df["confidence"] = np.max(
        probabilities,
        axis=1
    )

    predictions_path = os.path.join(
        ARTIFACT_DIR,
        "predictions.csv"
    )

    predictions_df.to_csv(
        predictions_path,
        index=False
    )

    mlflow.log_artifact(
        predictions_path
    )

    # --------------------------------------------------------
    # MODELO
    # --------------------------------------------------------

    input_example = X_test_scaled[:5].astype(np.float32)

    predictions = model.predict(
        input_example,
        verbose=0
    )

    signature = infer_signature(
        input_example,
        predictions
    )

    mlflow.keras.log_model(
        model,
        name="model",
        signature=signature
    )

    # --------------------------------------------------------
    # GUARDAR MODELO LOCAL
    # --------------------------------------------------------

    model_path = os.path.join(
        ARTIFACT_DIR,
        "model.keras"
    )

    model.save(
        model_path
    )

    mlflow.log_artifact(
        model_path
    )

    # --------------------------------------------------------
    # GUARDAR LABEL ENCODER
    # --------------------------------------------------------

    encoder_path = os.path.join(
        ARTIFACT_DIR,
        "classes.json"
    )

    with open(
        encoder_path,
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            class_names,
            f,
            indent=4,
            ensure_ascii=False
        )

    mlflow.log_artifact(
        encoder_path
    )

    # --------------------------------------------------------
    # GUARDAR SCALER
    # --------------------------------------------------------

    scaler_info = {
        "mean": scaler.mean_.tolist(),
        "scale": scaler.scale_.tolist(),
        "features": list(X.columns)
    }

    scaler_path = os.path.join(
        ARTIFACT_DIR,
        "scaler.json"
    )

    with open(
        scaler_path,
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            scaler_info,
            f,
            indent=4
        )

    mlflow.log_artifact(
        scaler_path
    )

    # --------------------------------------------------------
    # RESUMEN
    # --------------------------------------------------------

    summary = {
        "test_loss": float(test_loss),
        "test_accuracy": float(test_accuracy),
        "accuracy": float(metrics["accuracy"]),
        "precision": float(metrics["precision"]),
        "recall": float(metrics["recall"]),
        "f1": float(metrics["f1"]),
        "epochs_trained": len(
            history.history["loss"]
        )
    }

    summary_path = os.path.join(
        ARTIFACT_DIR,
        "experiment_summary.json"
    )

    with open(
        summary_path,
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            summary,
            f,
            indent=4
        )

    mlflow.log_artifact(
        summary_path
    )

    # --------------------------------------------------------
    # FIN
    # --------------------------------------------------------

    run = mlflow.active_run()

    print("\n" + "=" * 60)

    print(
        "ENTRENAMIENTO COMPLETADO"
    )

    print(
        f"Run ID: {run.info.run_id}"
    )

    print(
        f"Accuracy: {metrics['accuracy']:.4f}"
    )

    print(
        f"Precision: {metrics['precision']:.4f}"
    )

    print(
        f"Recall: {metrics['recall']:.4f}"
    )

    print(
        f"F1: {metrics['f1']:.4f}"
    )

    print("=" * 60)