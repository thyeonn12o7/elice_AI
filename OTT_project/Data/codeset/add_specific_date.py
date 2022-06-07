import pandas as pd

df = pd.read_csv("../add_video_address.csv", lineterminator="\n")
df.drop(df.columns[0], axis=1, inplace=True)

publishedatdate_list = []
for date in df["publishedAt"]:
    specific_date = date[:10]
    publishedatdate_list.append(specific_date)

df["publishedAt_specific_date"] = publishedatdate_list

df.to_csv('add_specific_publishedAt.csv', encoding='utf-8', index = True)


if __name__ == "__main__":
    pass