import pandas as pd

df = pd.read_csv("../youtube_trending_data.csv")
df.drop(df.columns[0], axis=1, inplace=True)

df["publishedAt"] = pd.to_datetime(df["publishedAt"])
df = df.sort_values(by="publishedAt")

address_list = []
for id in df["video_id"]:
    address = f"https://www.youtube.com/watch?v={id}"
    address_list.append(address)

df["video_Address"] = address_list

df.to_csv('add_video_address.csv', encoding='utf-8', index = True)

if __name__ == "__main__":
    pass